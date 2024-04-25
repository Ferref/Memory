// Játékosmód => Játék
// Ez fogja összekapcsolni őket

const tablameretGombok = document.querySelectorAll('#tablameret .navGomb');
const idozitoGombok = document.querySelectorAll('#idozito .navGomb');
const nehezsegGombok = document.querySelectorAll('#nehezseg .navGomb');

tablameretGombok.forEach(gomb => {
  gomb.addEventListener('click', function () {
    tablameretGombok.forEach(gomb => {
      gomb.classList.remove('kivalasztott');
    });
    this.classList.add('kivalasztott');
  });
});

idozitoGombok.forEach(gomb => {
  gomb.addEventListener('click', function () {
    idozitoGombok.forEach(gomb => {
      gomb.classList.remove('kivalasztott');
    });
    this.classList.add('kivalasztott');
  });
});

nehezsegGombok.forEach(gomb => {
  gomb.addEventListener('click', function () {
    nehezsegGombok.forEach(gomb => {
      gomb.classList.remove('kivalasztott');
    });
    this.classList.add('kivalasztott');
  });
});




