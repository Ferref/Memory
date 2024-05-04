document.addEventListener('DOMContentLoaded', function() {
    let nev1Input = '';
    let nev2Input = '';
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

    function setDefaultIfEmpty(inputField, defaultValue) {
        if (inputField.value.trim() === '') {
            inputField.value = defaultValue;
        }
    }

    const tablameretGombok = document.querySelectorAll('#tablameret button');
    const idozitoGombok = document.querySelectorAll('#idozito button');
    const nehezsegGombok = document.querySelectorAll('#nehezseg button');
    const jatekInditGomb = document.getElementById("jatek");

    gombokSotitese(tablameretGombok);
    gombokSotitese(idozitoGombok);
    gombokSotitese(nehezsegGombok);

    document.getElementById("container").addEventListener('click', function(event) {
        const target = event.target;
        if (target.id === "nev1Input") {
            resetInput(event);
        } else if (target.id === "nev2Input") {
            resetInput(event);
        }
    });

    document.getElementById("container").addEventListener('blur', function(event) {
        const target = event.target;
        if (target.id === "nev1Input") {
            setDefaultIfEmpty(target, 'Jatekos1');
        } else if (target.id === "nev2Input") {
            setDefaultIfEmpty(target, document.querySelector('#nev2') ? 'Jatekos2' : 'Nincs');
        }
    }, true);

    function kivalasztottEllenorzes() {
        let kivalasztottTablameret = document.querySelector('#tablameret button.kivalasztott');
        let kivalasztottIdozito = document.querySelector('#idozito button.kivalasztott');
        let kivalasztottNehezseg = document.querySelector('#nehezseg button.kivalasztott');

        const missingDataAlert = "Hiányos adatok! Kérjük válasszon ki egy elemet minden kategóriából.";

        if (!kivalasztottTablameret || !kivalasztottIdozito || (document.querySelector('#nehezseg') && !kivalasztottNehezseg)) {
            alert(missingDataAlert);
            return false;
        }

        tablameret = kivalasztottTablameret.textContent;
        idozito = kivalasztottIdozito.textContent;
        nehezseg = kivalasztottNehezseg ? kivalasztottNehezseg.textContent : "Nincs";

        return true;
    }

    jatekInditGomb.addEventListener('click', function (event) {
        event.preventDefault();
        if (kivalasztottEllenorzes()) {
            nev1Input = document.getElementById("nev1Input").value.trim() || "Játékos1";
            nev2Input = document.getElementById("nev2Input")?.value.trim() || (document.querySelector('#nev2') ? "Játékos2" : "Nincs");

            jatekmod = window.location.pathname.split("/").pop().split(".")[0];

            // Frissítjük az aktív képek src-jét
            const avatar1ActiveSlide = document.querySelector('#avatar1 .mySlides[style*="display: block"] img');
            const avatar2ActiveSlide = document.querySelector('#avatar2 .mySlides[style*="display: block"] img');

            const avatar1Src = avatar1ActiveSlide ? avatar1ActiveSlide.src : null;
            const avatar2Src = avatar2ActiveSlide ? avatar2ActiveSlide.src : null;

            const jatekAdatok = {
                jatekosNev1: nev1Input,
                jatekosNev2: nev2Input,
                jatekMod: jatekmod,
                tablaMeret: tablameret,
                megadottIdozito: idozito,
                megadottNehezseg: nehezseg,
                avatar1Src: avatar1Src,
                avatar2Src: avatar2Src
            };

            window.localStorage.setItem('jatekAdatok', JSON.stringify(jatekAdatok));

            window.location.href = "jatek.html";
        }
    });
});
