function play() {
    var audio = new Audio('hangok/flipcard-91468.mp3');
    audio.play();
  }
  
  function play2() {
    var audio2 = new Audio('hangok/carddrop2-92718.mp3');
    audio2.play();
  }
  
  function buttonclick() {
    var buttonsound = new Audio('hangok/click-button-140881.mp3');
    buttonsound.play();
  }
  
  function makeSound(url) {
    var buttonsound = new Audio('hangok/click-button-140881.mp3');
    buttonsound.play(); 
    setTimeout(function() {
       window.location.href = url;
    }, 100);
  }
  
  function makeSoundCheck(url) {
    var buttonsound = new Audio('hangok/click-button-140881.mp3');
    buttonsound.play(); 
    if(kivalasztottEllenorzes()) {
      setTimeout(function() {
        window.location.href = url;
      }, 100);
    }
  }

  
  