const nev1Input = document.getElementById("nev1Input");
const nev2Input = document.getElementById("nev2Input");

nev1Input.addEventListener('focus', function() {
    this.value = '';
});

if (nev2Input !== null){
  nev2Input.addEventListener('focus', function() {
    this.value = '';
  });
}

let nev1InputValue = '';
let nev2InputValue = '';
let jatekmod = '';
let tablameret = '';
let idozito = '';
let nehezseg = '';

function gombokSotitese(gombok) {
  gombok.forEach(gomb => {
    gomb.addEventListener('click', function () {
      gombok.forEach(gomb => {
        gomb.classList.remove('kivalasztott');
      });
      this.classList.add('kivalasztott');
    });
  });
}

function resetInput(e) {
  e.target.value = '';
}

const tablameretGombok = document.querySelectorAll('#tablameret button');
const idozitoGombok = document.querySelectorAll('#idozito button');
const nehezsegGombok = document.querySelectorAll('#nehezseg button');

gombokSotitese(tablameretGombok);
gombokSotitese(idozitoGombok);
gombokSotitese(nehezsegGombok);

function kivalasztottEllenorzes() {
  let kivalasztottTablameret = document.querySelector('#tablameret button.kivalasztott');
  let kivalasztottIdozito = document.querySelector('#idozito button.kivalasztott');
  let kivalasztottNehezseg = document.querySelector('#nehezseg button.kivalasztott');

  // Ellenőrizzük, hogy az adott elemek léteznek-e az oldalon, és csak ha léteznek, kérdezzük le a textContent-et
  tablameret = kivalasztottTablameret ? kivalasztottTablameret.textContent : "Nincs";
  idozito = kivalasztottIdozito ? kivalasztottIdozito.textContent : "Nincs";
  nehezseg = kivalasztottNehezseg ? kivalasztottNehezseg.textContent : "Nincs";

  // Ha van #nehezseg elemünk az oldalon, ellenőrizzük a többi kiválasztott gombot
  if (document.querySelector('#nehezseg')) {
    if (!kivalasztottTablameret || !kivalasztottIdozito || !kivalasztottNehezseg) {
      alert("Hiányos adatok! Kérjük válasszon ki egy elemet minden kategóriából.");
      return false;
    }
  } else {
    // Ha nincs #nehezseg elemünk az oldalon, csak a többi kategória ellenőrzése szükséges
    if (!kivalasztottTablameret || !kivalasztottIdozito) {
      alert("Hiányos adatok! Kérjük válasszon ki egy elemet minden kategóriából.");
      return false;
    }
    // Ha nincs #nehezseg elemünk az oldalon, akkor azonnal állítsuk "Nincs"-re
    nehezseg = "Nincs";
  }
  
  // Ellenőrizzük, hogy nev2Input értéke null vagy üres-e
  nev2InputValue = nev2Input ? nev2Input.value.trim() : "Nincs"; // Töröljük a felesleges szóközöket a kezdet és a végéről
  
  // Ha a nev2Input üres, akkor állítsuk "Nincs"-re
  if (!nev2InputValue) {
    nev2InputValue = "Nincs";
  }

  // Táblaméret legyen az aktuálisan kiválasztott érték
  tablameret = kivalasztottTablameret.textContent;
  return true;
}


const jatekInditasGombok = document.querySelectorAll('#gombok a[href="jatek.html"]');

jatekInditasGombok.forEach(gomb => {
  gomb.addEventListener('click', function (event) {
    event.preventDefault();
    if (kivalasztottEllenorzes()) {
      // Konstansok létrehozása
      nev1InputValue = nev1Input.value;
      nev2InputValue = nev2Input ? nev2Input.value || "Nincs" : "Nincs";

      jatekmod = window.location.pathname.split("/").pop().split(".")[0];

      // jatekAdatok létrehozása és exportálása
      const jatekAdatok = {
        jatekosNev1: nev1InputValue,
        jatekosNev2: nev2InputValue,
        jatekMod: jatekmod,
        tablaMeret: tablameret,
        megadottIdozito: idozito,
        megadottNehezseg: nehezseg
      };

      window.localStorage.setItem('jatekAdatok', JSON.stringify(jatekAdatok));

      window.location.href = this.getAttribute('href');
    }
  });
});
