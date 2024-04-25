let nev1Input;
let nev2Input;
let jatekmod;
let tablameret;
let idozito;
let nehezseg;

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

  // Ellenőrizzük, hogy van-e #nehezseg elemünk az oldalon
  if (document.querySelector('#nehezseg')) {
    // Ha van, akkor ellenőrizzük a kiválasztott gombokat
    if (!kivalasztottTablameret || !kivalasztottIdozito || !kivalasztottNehezseg) {
      alert("Hiányos adatok! Kérjük válasszon ki egy elemet minden kategóriából.");
      return false;
    }
  } else {
    // Ha nincs #nehezseg elemünk az oldalon, akkor csak a többi kategória ellenörzése kell nekünk
    if (!kivalasztottTablameret || !kivalasztottIdozito) {
      alert("Hiányos adatok! Kérjük válasszon ki egy elemet minden kategóriából.");
      return false;
    }
  }
  return true;
}

const jatekInditasGombok = document.querySelectorAll('#gombok a[href="jatek.html"]');

jatekInditasGombok.forEach(gomb => {
  gomb.addEventListener('click', function (event) {
    event.preventDefault();
    if (kivalasztottEllenorzes()) {
      // Konstansok létrehozása
      nev1Input = document.getElementById("nev1Input").value;
      nev2Input = document.getElementById("nev2Input").value;
      jatekmod = window.location.pathname.split("/").pop().split(".")[0];
      tablameret = document.querySelector('#tablameret button.kivalasztott').textContent;
      idozito = document.querySelector('#idozito button.kivalasztott').textContent;
      nehezseg = document.querySelector('#nehezseg button.kivalasztott').textContent;

      // Objektum létrehozása és exportálása
      const jatekAdatok = { nev1Input, nev2Input, jatekmod, tablameret, idozito, nehezseg };
      window.localStorage.setItem('jatekAdatok', JSON.stringify(jatekAdatok));

      window.location.href = this.getAttribute('href');
    }
  });
});
