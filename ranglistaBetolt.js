document.addEventListener('DOMContentLoaded', function () {
    const top3 = JSON.parse(localStorage.getItem('top3')) || [];
    const top3Table = document.getElementById('top3-table');

    function fillTable(table, data) {
        for (let i = 0; i < data.length; i++) {
            if (i < 3) {
                table.rows[i + 1].cells[0].textContent = data[i].name;
                table.rows[i + 1].cells[1].textContent = data[i].score;
            }
        }
    }

    fillTable(top3Table, top3);
});
