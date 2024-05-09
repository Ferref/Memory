function ellenoriz(event) {
    var biztositas = confirm("Biztos vagy benne? Még nincs vége a játéknak.");

    if (!biztositas) {
        event.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var linkek = document.querySelectorAll("a");

    for (var i = 0; i < linkek.length; i++) {
        linkek[i].addEventListener("click", ellenoriz);
    }
});
