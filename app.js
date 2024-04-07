class Jatek {
  constructor(jatekMod, jatekosNev1 = "Jatekos1", jatekosNev2 = "Jatekos2", tablaMeret = 4) {
    this.jatekMod = jatekMod;
    this.jatekosNev2 = (jatekmod === "gepEllen") ? jatekosNevGeneral : jatekosNev2;
    this.nehezsegiSzint = nehezsegiSzint;
    this.tabla = this.tablaGeneral(tablaMeret);
  }

  jatekosNevGeneral() {
    lehetsegesJatekosNevek = ["Béla", "Tibi", "Ottó", "Anna", "Niki", "Zsolti", "Alfréd"];
    lehetsegesJatekosNev = lehetsegesJatekosNevek[Math.floor(Math.random() * lehetsegesJatekosNevek + 1)];
    return lehetsegesJatekosNev;
  }

  tablaGeneral(tablaMeret = 4) {
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


}