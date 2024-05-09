document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.navGomb');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Az alapértelmezett esemény megakadályozása
            
            var href = button.parentElement.getAttribute('href');
            
            if (!confirm("Biztos ki akarsz lépni? A játéknak még nincsen vége.")) {
                return; // Ha a felhasználó a "Mégsem" opciót választotta, egyszerűen térjünk vissza az eseménykezelőből
            }

            window.location.href = href; // Ha a felhasználó megerősítette a kilépést, akkor irányítson át az adott oldalra
        });
    });
});
