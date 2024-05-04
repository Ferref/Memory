class Jatek {
  constructor(
    tablaMeret,
    jatekosNev1,
    jatekosNev2,
    idokorlat,
    avatar1Src,
    avatar2Src
  ) {
    tablaMeret = Math.abs(Number(tablaMeret.split(" ")[0]));
    this.idokorlatInSeconds = Math.abs(Number(idokorlat.split(" ")[0])) * 60;


    this.jatekos1 = new Jatekos(jatekosNev1, document.getElementById("jatekos1Adatai"), avatar1Src);
    this.jatekos2 = new Jatekos(jatekosNev2, document.getElementById("jatekos2Adatai"), avatar2Src);
    this.tabla = new Tabla(tablaMeret);
    this.kartyak = [];
    this.kartyaVanMeg = tablaMeret * tablaMeret;
    this.korSzamlalo = 0;
    this.aktivLapok = [];
    this.kieertekelesTortenik = false;
    this.aktivJatekos = null;

    this.jatekForrasok = {
      kartyaKepek: 'kepek/kartyak/',
      kerdojelKartyaKep: 'kerdojelKartya',
      kimentKartyaKep: 'kimentKartya'
    };
  }

  // Legenerálja nekünk a kártyákat
  kartyakGeneral() {
    const hanyKepKell = this.tabla.tablaMeret * this.tabla.tablaMeret / 2;
    const kepIndexek = [];

    for (let i = 0; i < hanyKepKell; i++) {
      kepIndexek.push(i);
    }

    var kepParok = [...kepIndexek, ...kepIndexek];

    let jelenlegiIndex = kepParok.length;
    while (jelenlegiIndex != 0) {
      let randomIndex = Math.floor(Math.random() * jelenlegiIndex);
      jelenlegiIndex--;
      [kepParok[jelenlegiIndex], kepParok[randomIndex]] = [
        kepParok[randomIndex], kepParok[jelenlegiIndex]
      ];
    }

    for (let i = 0; i < kepParok.length; i++) {
      var kartya = new Kartya(kepParok[i]);
      kartya.kartyaElrejt();
      this.kartyak.push(kartya);
    }
  }

  // Elinditja a jatekot
  jatekIndit() {
    console.log("Start...");
    this.kartyakGeneral();
    this.aktivJatekos = this.jatekos1;

    this.kovetkezoKor();
    this.kartyakMegjelenitese();

    // Időzítő kezelése
    const idozitoElem = document.getElementById('idozito');

    if (this.idokorlatInSeconds) {
      // Van időkorlát, jelenítsük meg az időt
      const idozitoId = setInterval(() => {
        const minutes = Math.floor(this.idokorlatInSeconds / 60);
        const seconds = this.idokorlatInSeconds % 60;
        idozitoElem.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.idokorlatInSeconds--; // Csökkentjük az időt minden másodpercben

        if (this.idokorlatInSeconds < 0) {
          clearInterval(idozitoId); // Időzítő leállítása, ha az idő lejárt
          idozitoElem.textContent = "Vége"; // Jelzés, hogy vége az időnek
          this.jatekVege(); // Hívjuk meg a játék vége metódust
        }
      }, 1000);
    } else {
      // Nincs időkorlát, csak jelenítsük meg a "Nincs" szöveget
      idozitoElem.textContent = "Nincs";
    }
  }

  // Megjeleníti a táblán a kártyákat
  kartyakMegjelenitese() {
    for (let i = 0; i < this.kartyak.length; i++) {
      // Kiszámoljuk az aktuális oszlop- és sorszámot az arányos elhelyezéshez
      const row = Math.floor(i / this.tabla.tablaMeret);
      const col = i % this.tabla.tablaMeret;
  
      // Beállítjuk a kártya elhelyezését a táblán
      this.kartyak[i].kartyaDiv.style.gridColumn = col + 1; // Oszlopszám kezdőértéke 1
      this.kartyak[i].kartyaDiv.style.gridRow = row + 1; // Sorszám kezdőértéke 1
  
      // Hozzáadjuk a kártyát a táblához
      this.tabla.tablaDiv.appendChild(this.kartyak[i].kartyaDiv);
    }
  }

  // Megnézi hogy egyeznek-e a kártyák
  aktivKartyakEgyeznek() {
    if (this.aktivLapok[0].kartyaDiv.getAttribute("name") === this.aktivLapok[1].kartyaDiv.getAttribute("name")) {
      return true;
    } else {
      return false;
    }
  }

// Átkapcsol a következő körre
kovetkezoKor() {
  console.log("Aktiv: " + this.aktivJatekos.jatekosNev);
  console.log("talalt: " + this.elozoTalalt);
  this.korSzamlalo++;
  console.log("\n\n\nK Ö R: " + this.korSzamlalo);
  console.log("#########" + this.aktivJatekos.jatekosNev + "#########");

  // Check if it's not the first turn
  if (this.korSzamlalo > 1) {
      // Switch players if the previous cards didn't match
      if (!this.elozoTalalt) {
          this.aktivJatekos = this.aktivJatekos === this.jatekos1 ? this.jatekos2 : this.jatekos1;
      }

      // Check if the active cards match
      if (this.aktivKartyakEgyeznek()) {
          console.log("Kártyák egyeznek!");

          // Increment player's points and mark previous match as successful
          this.aktivJatekos.kartyaFelvesz();
          this.aktivJatekos.elozoTalalt = true;

          // Remove matched cards from the game
          for (let i = 0; i < this.aktivLapok.length; i++) {
              this.aktivLapok[i].kartyaKiment();
          }

          let firstIndexOfMegtalalt = this.kartyak.indexOf(this.aktivLapok[0]);
          let lastIndexOfMegtalalt = this.kartyak.indexOf(this.aktivLapok[1]);

          this.kartyak.splice(firstIndexOfMegtalalt, 1);
          this.kartyak.splice(lastIndexOfMegtalalt - 1, 1);

          this.kartyaVanMeg -= 2;
      } else {
          console.log("Kártyák nem egyeznek");

          // Hide cards if they don't match
          for (let i = 0; i < this.aktivLapok.length; i++) {
              this.aktivLapok[i].kartyaElrejt();
          }
      }

      // Check if all cards are matched
      if (this.kartyaVanMeg === 0) {
          this.jatekVege();
      }

      // Reset active cards array
      this.aktivLapok = [];
  }

  // Update player information on the page
  document.getElementById('jatekos1Adatai').querySelector('.jatekosNev').textContent = this.jatekos1.jatekosNev;
  document.getElementById('jatekos1Adatai').querySelector('.jatekosPontok').textContent = 'Pontok: ' + this.jatekos1.pontok;
  if (this.jatekos2) {
      document.getElementById('jatekos2Adatai').querySelector('.jatekosNev').textContent = this.jatekos2.jatekosNev;
      document.getElementById('jatekos2Adatai').querySelector('.jatekosPontok').textContent = 'Pontok: ' + this.jatekos2.pontok;
  }
  document.getElementById("aktualisJatekosNev").innerText = this.aktivJatekos.jatekosNev;
  this.kieertekelesTortenik = false;
}



  // Befejezi a játékot
  jatekVege() {
    // Győztes kiválasztása
    let gyoztes = "";
    if (this.jatekos1.pontok === this.jatekos2.pontok) {
      gyoztes = "Döntetlen";
    } else {
      gyoztes = this.jatekos1.pontok > this.jatekos2.pontok ? this.jatekos1.jatekosNev : this.jatekos2.jatekosNev;
    }
    gyoztes += " Nyert";
  
    // Összes játékos neve és pontszáma
    const jatekosok = [
      { nev: this.jatekos1.jatekosNev, pontok: this.jatekos1.pontok },
      { nev: this.jatekos2.jatekosNev, pontok: this.jatekos2.pontok }
    ];
  
    // Ranglista frissítése
    const top3 = JSON.parse(localStorage.getItem('top3')) || [];
  
    jatekosok.forEach(jatekos => {
      const { nev, pontok } = jatekos;
      const jatekosTop3 = top3.find(elem => elem.name === nev);
  
      if (!jatekosTop3 && pontok > 0) {
        top3.push({ name: nev, score: pontok });
      } else if (jatekosTop3 && pontok > jatekosTop3.score) {
        jatekosTop3.score = pontok;
      }
    });
  
    top3.sort((a, b) => b.score - a.score);
  
    const korlatozottTop3 = top3.slice(0, 3);
  
    localStorage.setItem('top3', JSON.stringify(korlatozottTop3));
  
    // Várunk 2 másodpercet, majd átirányítjuk a felhasználót a ranglistára
    setTimeout(() => {
      window.location.href = "ranglista.html";
    }, 2000);
  }
  



  
}

class Jatekos {
  constructor(jatekosNev, jatekosKep, avatarSrc) {
    this.jatekosNev = jatekosNev;
    this.pontok = 0;
    this.varakozasAKovetkezoJatekosra = false;
    this.elozoTalalt = false;
    jatekosKep.style.backgroundImage = `url(${avatarSrc})`;
  }

  // Hozzáadja a kártyákat a soron következő játékoshoz
  kartyaFelvesz() {
    this.pontok++;
  }
}

class Kartya {
  constructor(name) {
    this.kartyaDiv = document.createElement("div");
    this.kartyaDiv.classList.add("kartya");
    this.kartyaDiv.setAttribute("name", name);
    this.kartyaElrejt();

    this.kartyaDiv.onclick = () => {
      if (this.kartyaStatus === 'mutat' || ujJatek.kieertekelesTortenik || this.kartyaStatus === 'kiment') {
        return; // Ha a státusz "kiment", ne csináljon semmit
      }

      if (this.kartyaStatus === 'rejtett') {
        this.kartyaMegjelenit();
      }

      ujJatek.aktivLapok.push(this);

      if (ujJatek.aktivLapok.length === 2) {
        ujJatek.kieertekelesTortenik = true;
        console.log("Megvan a két lap, ellenőrzés...");

        setTimeout(function () {
          ujJatek.kovetkezoKor();
        }, 2000);
      }
    }

    // Ha vége az animációnak
    this.kartyaDiv.addEventListener('transitionend', () => {
      this.kartyaDiv.style.transition = '';
    });
  }

  kepBeallitKartyanak(kep) {
    var url = "url('" + ujJatek.jatekForrasok.kartyaKepek + kep + ".jpg')";
    this.kartyaDiv.style.backgroundImage = url;
    console.log(url);
  }

  kartyaElrejt() {
    console.log("Kártya elrejtve: " + this.kartyaDiv.getAttribute("name"));
    this.kartyaDiv.style.transform = "rotateY(0deg)"; // Visszafordítás 0 fokra
    this.kartyaDiv.style.transition = "transform 0.5s ease"; // CSS tranzíció beállítása
    this.kepBeallitKartyanak(ujJatek.jatekForrasok.kerdojelKartyaKep);
    this.kartyaStatus = "rejtett";
  }

  kartyaMegjelenit() {
    console.log("Kártya megjelenítve: " + this.kartyaDiv.getAttribute("name"));

    // Eltávolitjuk az atmeneti stilust
    this.kartyaDiv.style.transition = '';

    // A kártya forgatása
    this.kartyaDiv.style.transform = "rotateY(180deg)";

    setTimeout(() => {
      // Animacio felenek idejenel checkoljuk hogy melyik oldal lathato
      if (this.kartyaStatus.status === 'rejtett') {
        this.kepBeallitKartyanak('kerdojelKartya'); // Ha a rejtett oldal => kerdojelKartya
      } else {
        this.kepBeallitKartyanak(this.kartyaDiv.getAttribute("name")); // Ha mutatva van a kártya akkor a "name"
      }

      // Atmenet ujra
      this.kartyaDiv.style.transition = "transform 0.5s ease";
      this.kartyaStatus = 'mutat';
    }, 50);
  }

  kartyaKiment() {
    console.log("Kártya kimentve: " + this.kartyaDiv.getAttribute("name"));
    this.kepBeallitKartyanak(ujJatek.jatekForrasok.kimentKartyaKep);
    this.kartyaStatus = "kiment";
  }
}

class Tabla {
  constructor(tablaMeret) {
    this.tablaMeret = tablaMeret;
    this.tablaDiv = document.getElementById("tabla");

    // grid elosztás beállítása
    this.tablaDiv.style.gridTemplateColumns = `repeat(${this.tablaMeret}, 125px)`;
    this.tablaDiv.style.gridTemplateRows = `repeat(${this.tablaMeret}, 125px)`;
  }
}



// jatekmodKapcsol.js-ből kapjuk meg, oldal betöltődése után indul is

const jatekAdatok = JSON.parse(window.localStorage.getItem('jatekAdatok'));
const ujJatek = new Jatek(
  jatekAdatok.tablaMeret,
  jatekAdatok.jatekosNev1,
  jatekAdatok.jatekosNev2,
  jatekAdatok.megadottIdozito,
  jatekAdatok.avatar1Src,
  jatekAdatok.avatar2Src
);

ujJatek.jatekIndit();
console.log(ujJatek);
