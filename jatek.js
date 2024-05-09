// jatek.js

class Jatek {
  constructor(
    tablaMeret,
    jatekosNev1,
    jatekosNev2,
    idokorlat,
    avatar1Src,
    avatar2Src,
    jatekMod
  ) {
    tablaMeret = Math.abs(Number(tablaMeret.split(" ")[0]));
    this.idokorlatInSeconds = Math.abs(Number(idokorlat.split(" ")[0])) * 60;
    this.jatekos1 = new Jatekos(jatekosNev1, document.getElementById("jatekos1Kep"), avatar1Src);

    
    if(jatekMod === 'jatekosellen')
    {
      this.jatekos2 = new Jatekos(jatekosNev2, document.getElementById("jatekos2Kep"), avatar2Src);
    }

    this.jatekMod = jatekMod;
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
    if(this.jatekMod == 'szolo')
    {
      document.getElementById('jatekos2Adatai').remove();
    }

    this.kartyakGeneral();
    this.aktivJatekos = this.jatekos1;
    document.getElementById('jatekos1Kep').style.borderColor='green'; // <!-- -->

    this.kovetkezoKor();
    this.kartyakMegjelenitese();

    const idozitoElem = document.getElementById('idozito');

    if (this.idokorlatInSeconds) {

      const idozitoId = setInterval(() => {
        const minutes = Math.floor(this.idokorlatInSeconds / 60);
        const seconds = this.idokorlatInSeconds % 60;
        idozitoElem.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.idokorlatInSeconds--;

        if (this.idokorlatInSeconds < 0) {
          clearInterval(idozitoId);
          idozitoElem.textContent = "Vége";
          this.jatekVege();
        }
      }, 1000);
    } else {
      
      idozitoElem.textContent = "Nincs";
    }
  }

  
  kartyakMegjelenitese() {
    for (let i = 0; i < this.kartyak.length; i++) {
      
      const row = Math.floor(i / this.tabla.tablaMeret);
      const col = i % this.tabla.tablaMeret;
  
      
      this.kartyak[i].kartyaDiv.style.gridColumn = col + 1;
      this.kartyak[i].kartyaDiv.style.gridRow = row + 1;

      
    if ((this.tabla.tablaMeret*this.tabla.tablaMeret)==36) { // <!-- -->
      this.kartyak[i].kartyaDiv.style.width='100px'; // <!-- -->
      this.kartyak[i].kartyaDiv.style.height='100px'; // <!-- -->
    }
    else if ((this.tabla.tablaMeret*this.tabla.tablaMeret)==64) { // <!-- -->
      this.kartyak[i].kartyaDiv.style.width='75px'; // <!-- -->
      this.kartyak[i].kartyaDiv.style.height='75px'; // <!-- -->
    }
  
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
    // Jatekosinfok Update
    this.korSzamlalo++;

    if (this.korSzamlalo > 1) {

      if (this.aktivKartyakEgyeznek()) {

          this.aktivJatekos.kartyaFelvesz();
          this.aktivJatekos.elozoTalalt = true;

          for (let i = 0; i < this.aktivLapok.length; i++) {
              this.aktivLapok[i].kartyaKiment();
          }

          let firstIndexOfMegtalalt = this.kartyak.indexOf(this.aktivLapok[0]);
          let lastIndexOfMegtalalt = this.kartyak.indexOf(this.aktivLapok[1]);

          this.kartyak.splice(firstIndexOfMegtalalt, 1);
          this.kartyak.splice(lastIndexOfMegtalalt - 1, 1);

          this.kartyaVanMeg -= 2;
          play3(); // <!-- -->
      } else {
        play2(); // <!-- -->
          this.aktivJatekos.elozoTalalt = false;
          for (let i = 0; i < this.aktivLapok.length; i++) {
              this.aktivLapok[i].kartyaElrejt();
          }
      }

      if (this.kartyaVanMeg === 0) {
        this.idokorlatInSeconds = 0;
          this.jatekVege();
      }

      this.aktivLapok = [];

      if(this.jatekMod != 'szolo')
      {
      if (!this.aktivJatekos.elozoTalalt) {
          if(this.aktivJatekos === this.jatekos1){
            this.aktivJatekos = this.jatekos2;
            document.getElementById('jatekos1Kep').style.borderColor='black'; // <!-- -->
            document.getElementById('jatekos2Kep').style.borderColor='green'; // <!-- -->
          }
          else if(this.aktivJatekos === this.jatekos2){
            this.aktivJatekos = this.jatekos1;
            document.getElementById('jatekos1Kep').style.borderColor='green'; // <!-- -->
            document.getElementById('jatekos2Kep').style.borderColor='black'; // <!-- -->
          }
        }
      }
    }

    document.getElementById('jatekos1Adatai').querySelector('.jatekosNev').textContent = this.jatekos1.jatekosNev;
    document.getElementById('jatekos1Adatai').querySelector('.jatekosPontok').textContent = 'Pontok: ' + this.jatekos1.pontok;

    if(this.jatekMod != "szolo"){
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
    if (this.jatekMod !== 'szolo' && this.jatekos1.pontok === this.jatekos2.pontok) {
        gyoztes = "Döntetlen";
    } else if (this.jatekMod !== 'szolo') {
        gyoztes = this.jatekos1.pontok > this.jatekos2.pontok ? this.jatekos1.jatekosNev : this.jatekos2.jatekosNev;
    } else {
        gyoztes = this.jatekos1.jatekosNev + " Nyert"; // In solo mode, only player 1 can win
    }

    // Összes játékos neve és pontszáma
    let jatekosok = [];

    // Add only player 1's data in solo mode
    if (this.jatekMod !== 'szolo') {
        jatekosok.push({ nev: this.jatekos1.jatekosNev, pontok: this.jatekos1.pontok, jatekMod: this.jatekMod });
        jatekosok.push({ nev: this.jatekos2.jatekosNev, pontok: this.jatekos2.pontok, jatekMod: this.jatekMod });
    } else {
        jatekosok.push({ nev: this.jatekos1.jatekosNev, pontok: this.jatekos1.pontok, jatekMod: this.jatekMod });
    }

    // Ranglista frissítése
    let top3 = JSON.parse(localStorage.getItem('top3')) || [];

    jatekosok.forEach(jatekos => {
        const { nev, pontok, jatekMod } = jatekos;
        const jatekosTop3 = top3.find(elem => elem.name === nev);

        if (!jatekosTop3 && pontok > 0) {
            top3.push({ name: nev, score: pontok, jatekMod: jatekMod });
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
  }

  kartyaElrejt() {
    this.kartyaDiv.style.transform = "rotateY(0deg)"; // Visszafordítás 0 fokra
    this.kartyaDiv.style.transition = "transform 0.5s ease"; // CSS tranzíció beállítása
    this.kepBeallitKartyanak(ujJatek.jatekForrasok.kerdojelKartyaKep);
    this.kartyaStatus = "rejtett";
  }

  kartyaMegjelenit() {
    play(); // <!-- -->

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
    this.kepBeallitKartyanak(ujJatek.jatekForrasok.kimentKartyaKep);
    this.kartyaStatus = "kiment";
  }
}

class Tabla {
  constructor(tablaMeret) {
    this.tablaMeret = tablaMeret;
    this.tablaDiv = document.getElementById("tabla");

    // grid elosztás beállítása
    if((this.tablaMeret*this.tablaMeret)==16) {
      this.tablaDiv.style.gridTemplateColumns = `repeat(${this.tablaMeret}, 125px)`; // <!-- -->
      this.tablaDiv.style.gridTemplateRows = `repeat(${this.tablaMeret}, 125px)`; // <!-- -->
    }
    else if ((this.tablaMeret*this.tablaMeret)==36) {
      this.tablaDiv.style.gridTemplateColumns = `repeat(${this.tablaMeret}, 100px)`; // <!-- -->
      this.tablaDiv.style.gridTemplateRows = `repeat(${this.tablaMeret}, 100px)`; // <!-- -->
    }
    else if ((this.tablaMeret*this.tablaMeret)==64) {
      this.tablaDiv.style.gridTemplateColumns = `repeat(${this.tablaMeret}, 75px)`; // <!-- -->
      this.tablaDiv.style.gridTemplateRows = `repeat(${this.tablaMeret}, 75px)`; // <!-- -->
    }
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
  jatekAdatok.avatar2Src,
  jatekAdatok.jatekMod
);

ujJatek.jatekIndit();
