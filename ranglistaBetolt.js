document.addEventListener('DOMContentLoaded', function () {
    const top3 = JSON.parse(localStorage.getItem('top3')) || [];

    const pvpTable = document.getElementById('pvp-table');
    const pcTable = document.getElementById('pc-table');
    const soloTable = document.getElementById('solo-table');
    
    function fillTable(table, data) {
        for (let i = 0; i < data.length; i++) {
            if (i < 3) {
                table.rows[i + 1].cells[0].textContent = data[i].name;
                table.rows[i + 1].cells[1].textContent = data[i].score;
            }
        }
    }

    fillTable(pvpTable, top3);
    fillTable(pcTable, top3);
    fillTable(soloTable, top3);
});
