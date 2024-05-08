function play() {
    var audio = new Audio('hangok/flipcard-91468.mp3');
    audio.play();
  }
  
  function play2() {
    var audio2 = new Audio('hangok/carddrop2-92718.mp3');
    audio2.play();
  }

  function play3() {
    var audio2 = new Audio('hangok/success.mp3');
    audio2.play();
  }
  
  function buttonclick() {
    var buttonsound = new Audio('hangok/click.mp3');
    buttonsound.play();
  }
  
  function makeSound(url) {
    var buttonsound = new Audio('hangok/click.mp3');
    buttonsound.play(); 
    setTimeout(function() {
       window.location.href = url;
    }, 100);
  }
  
  /*
  function makeSoundCheck(url, event) {
    var buttonsound = new Audio('hangok/click.mp3');
    buttonsound.play(); 
    if(kivalasztottEllenorzes()) {
      console.log("false");
      setTimeout(function() {
        window.location.href = url;
      }, 100);
    }
  }
  */

let on_off = document.querySelector('.zenecontainer .lejatszo');
let audio = document.querySelector('.musicOn audio');

on_off.onclick = function() {
  on_off.style.backgroundImage="url()";
  if(audio.paused){
    audio.play();
    on_off.innerHTML = '<img src="kepek/pause.png" />';
  } else {
    audio.pause();
    on_off.innerHTML = '<img src="kepek/play.png" />';
  }
}

  
  