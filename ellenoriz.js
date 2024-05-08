var buttons = document.querySelectorAll('a[href^="#"] > button.navGomb');

buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        
        var href = button.parentElement.getAttribute('href');
        
        if(confirm("Biztos ki akarsz lépni? A játéknak még nincsen vége.")) {
            // User confirmed, do not perform any redirection

        } else {
            return;
        }
    });
});
