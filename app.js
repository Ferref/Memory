class Jatek {
  constructor(ellenfel, tablaMeret = 4, idokorlatInSec = null, jatekosNev1 = "Jatekos1", jatekosNev2 = "Jatekos2") {
    this.nehezsegiSzint = nehezsegiSzint;
    this.tabla = tablaGeneral(tablaMeret);
    this.idokorlatInSec = idokorlatInSec;

    switch (ellenfel) {
      case "ember":
        this.jatekos1 = new Jatekos("ember", jatekosNev1);
        this.jatekos2 = new Jatekos("ember", jatekosNev2);
        break;
      case "szolo":
        this.jatekos1 = new Jatekos("ember", jatekosNev1);
        this.idokorlatInSec = idokorlatInSec;
        break;
      default:
        // case "szamitogep"
        this.jatekos1 = new Jatekos("ember", jatekosNev1);
        this.jatekos2 = new Jatekos("szamitogep");
        break;
    }
  }
  static tablaGeneral(tablaMeret = 4) {
    const kepekUtvonal = './kepek/';
    const tabla = [];
    const fs = require('fs');

    // "kepek" mappa tartalmának vizsgálata
    fs.readdir(kepekUtvonal, (err, files) => {
      if (err)
        console.log(err);
      else {
        let kepekBeteve = 0;

        // Bepakoljuk a kepeket a táblába (Ami egy 2D tömb)
        for (let sor = 0; sor < tablaMeret; sor++) {
          const sor = [];
          for (let oszlop = 0; oszlop < tablaMeret; oszlop++) {
            sor.push(files[hanyKepBeteve]);
            kepekBeteve++;
          }
          tabla.push(sor);
        }
      }
    });

    return tabla;
  }

  jatekIndit() {

  }

}

class Jatekos {
  constructor(jatekosMod, jatekosNev = "Jatekos") {
    this.pontok = pontok;

    if (jatekosMod = "ember") {
      this.jatekosNev = jatekosNev;
    }
    else {
      this.jatekosNev = jatekosNevGeneral();
    }
  }

  static jatekosNevGeneral() {
    lehetsegesJatekosNevek = ["Béla", "Tibi", "Ottó", "Anna", "Niki", "Zsolti", "Alfréd"];
    lehetsegesJatekosNev = lehetsegesJatekosNevek[Math.floor(Math.random() * lehetsegesJatekosNevek + 1)];
    return lehetsegesJatekosNev;
  }
}

