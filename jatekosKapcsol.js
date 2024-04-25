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

const tablameretGombok = document.querySelectorAll('#tablameret button');
const idozitoGombok = document.querySelectorAll('#idozito button');
const nehezsegGombok = document.querySelectorAll('#nehezseg button');
const inputMezok = document.querySelectorAll('input');

gombokSotitese(tablameretGombok);
gombokSotitese(idozitoGombok);
gombokSotitese(nehezsegGombok);

inputMezok.forEach(input => {
  input.addEventListener('focus', resetInput);
});
