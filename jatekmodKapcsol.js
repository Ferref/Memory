document.addEventListener('DOMContentLoaded', function() {
    let nev1Input = '';
    let nev2Input = '';
    let tablameret = '';
    let idozito = '';

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

    gombokSotitese(tablameretGombok);
    gombokSotitese(idozitoGombok);

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

        const missingDataAlert = "Hiányos adatok! Kérjük válasszon ki egy elemet minden kategóriából.";

        if (!kivalasztottTablameret || !kivalasztottIdozito) {
            alert(missingDataAlert);
            return false;
        }

        tablameret = kivalasztottTablameret.textContent;
        idozito = kivalasztottIdozito.textContent;

        return true;
    }

    const jatekInditGomb = document.getElementById("jatek");
    jatekInditGomb.addEventListener('click', function (event) {
        event.preventDefault();
        buttonclick();
        if (kivalasztottEllenorzes()) {
            nev1Input = document.getElementById("nev1Input").value.trim() || "Játékos1";
            nev2Input = document.getElementById("nev2Input")?.value.trim() || (document.querySelector('#nev2') ? "Játékos2" : "Nincs");

            // Frissítjük az aktív képek src-jét
            const avatar1ActiveSlide = document.querySelector('#avatar1 .mySlides[style*="display: block"] img');
            const avatar2ActiveSlide = document.querySelector('#avatar2 .mySlides[style*="display: block"] img');

            const avatar1Src = avatar1ActiveSlide ? avatar1ActiveSlide.src : null;
            const avatar2Src = avatar2ActiveSlide ? avatar2ActiveSlide.src : null;

            let position = window.location.href.split('/');
            let currentPage = position[position.length - 1];
            let currentPageParts = currentPage.split('.');

            
            const jatekAdatok = {
                jatekosNev1: nev1Input,
                jatekosNev2: nev2Input,
                tablaMeret: tablameret,
                megadottIdozito: idozito,
                avatar1Src: avatar1Src,
                avatar2Src: avatar2Src,
                jatekMod: currentPageParts[0]
                
            };

            window.localStorage.setItem('jatekAdatok', JSON.stringify(jatekAdatok));

            window.location.href = "jatek.html";
        }
    });
});
