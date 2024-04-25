class Jatek {
  // Játékos létrehozása
  constructor(
    jatekMod,
    tablaMeret,
    jatekosNev1,
    jatekosNev2,
    idokorlat,
    nehezseg
  ) {
    this.tablaMeret = Math.abs(Number(tablaMeret.split(" ")[0]));
    this.tablaMeret = this.tablaMeret % 2 === 0 ? this.tablaMeret : this.tablaMeret - 1;
    this.idokorlatInSeconds = Math.abs(Number(idokorlat.split(" ")[0])) * 60;

    // Játékmód kiválasztása
    switch (jatekMod) {
      case "jatekosellen":
        this.jatekos1 = new Jatekos(jatekosNev1);
        this.jatekos2 = new Jatekos(jatekosNev2);
        break;
      case "szolo":
        this.jatekos1 = new Jatekos(jatekosNev1);
        break;
      default:
        this.jatekos1 = new Jatekos(jatekosNev1);
        this.jatekos2 = new SzamitogepJatekos();
        break;
    }

    this.tabla = new Tabla(this.tablaMeret);
    this.kartyak = [];
    this.kartyaVanMeg = this.tablaMeret * this.tablaMeret;
    this.korSzamlalo = 0;
    this.aktivLapok = [];
    this.kieertekelesTortenik = false;
    this.aktivJatekos = null;
    this.nehezseg = nehezseg;

    this.jatekForrasok = {
      kartyaKepek: 'kepek/kartyak/',
      kerdojelKartyaKep: 'kerdojelKartya',
      kimentKartyaKep: 'kimentKartya'
    };
  }

  // Legenerálja nekünk a kártyákat
  kartyakGeneral() {
    const hanyKepKell = this.tablaMeret * this.tablaMeret / 2;
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

  // Megjeleníti a táblán a kárytákat
  kartyakMegjelenitese() {
    for (let i = 0; i < this.kartyak.length; i++) {
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
    this.korSzamlalo++;
    console.log("\n\n\nK Ö R: " + this.korSzamlalo);
    console.log("#########" + this.aktivJatekos.jatekosNev + "#########");

    if (this.korSzamlalo > 1) {
      // Váltogat a két játékosunk között
      // Szóló módban nem kell váltogatni

      if (this.jatekMod != "szolo") {

        // Ha nem talált az előző kártyakombináció akkor a másik játékos jön

        if (!this.aktivJatekos.elozoTalalt) {
          if (this.aktivJatekos === this.jatekos1) {
            this.aktivJatekos = this.jatekos2;
          } else if (this.aktivJatekos === this.jatekos2) {
            this.aktivJatekos = this.jatekos1;
          }
        }
      }

      if (this.aktivKartyakEgyeznek()) {
        console.log("Kártyák egyeznek!");

        this.aktivJatekos.kartyaFelvesz();
        this.aktivJatekos.elozoTalalt = true;

        for (let i = 0; i < this.aktivLapok.length; i++) {
          this.aktivLapok[i].kartyaKiment();
        }

        let firstIndexOfMegtalalt = this.kartyak.indexOf(this.aktivLapok[0]);
        let lastIndexOfMegtalalt = this.kartyak.indexOf(this.aktivLapok[1]);

        this.kartyak.splice(firstIndexOfMegtalalt, 1);
        this.kartyak.splice(lastIndexOfMegtalalt, 1);

        this.kartyaVanMeg -= 2;
      } else {
        console.log("Kártyák nem egyeznek");
        for (let i = 0; i < this.aktivLapok.length; i++) {
          this.aktivLapok[i].kartyaElrejt();
        }
      }

      // Ha nincs már kártya vége a dalnak
      if (this.kartyaVanMeg === 0) {
        this.jatekVege();
      }

      this.aktivLapok = [];
    }

    this.kieertekelesTortenik = false;
  }

  // Befejezi a játékot
  jatekVege() {
    console.log("Vége a játéknak.");
  }
}

class Jatekos {
  constructor(jatekosNev) {
    this.jatekosNev = jatekosNev;
    this.pontok = 0;
    this.varakozasAKovetkezoJatekosra = false;
    this.elozoTalalt = false;
  }

  // Hozzáadja a kártyákat a soron következő játékoshoz
  kartyaFelvesz() {
    this.pontok++;
  }
}

class SzamitogepJatekos extends Jatekos {
  constructor() {
    super(SzamitogepJatekos.jatekosNevGeneral());
  }

  // Nevet generál ha számítógép a játékos
  static jatekosNevGeneral() {
    var lehetsegesJatekosNevek = ["Béla", "Tibi", "Ottó", "Anna", "Niki", "Zsolti", "Alfréd"];
    var lehetsegesJatekosNev = lehetsegesJatekosNevek[Math.floor(Math.random() * lehetsegesJatekosNevek.length)];

    return lehetsegesJatekosNev;
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
  }
}

// jatekmodKapcsol.js-ből kapjuk meg, oldal betöltődése után indul is

const jatekAdatok = JSON.parse(window.localStorage.getItem('jatekAdatok'));
const ujJatek = new Jatek(
  jatekAdatok.jatekMod,
  jatekAdatok.tablaMeret,
  jatekAdatok.jatekosNev1,
  jatekAdatok.jatekosNev2,
  jatekAdatok.megadottIdozito,
  jatekAdatok.megadottNehezseg
);

ujJatek.jatekIndit();
