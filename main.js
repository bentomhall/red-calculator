class Util {
    static doCleanup(chart, table) {
        chart?.destroy();
        table.innerHTML = '';
    }
    static average(data) {
        return data.reduce((p,c)=>p+c,0)/data.length;
    }
    static createChart(ctx, datasets) {
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                datasets: datasets
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        grace: 1
                    }
                }
            }
        });
    }
    static round(value, decimals = 2) {
        let scaleFactor = Math.pow(10, decimals);
        return Math.round(value*scaleFactor)/scaleFactor;
    }
    static getRandomColor() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
    static fillTable(table, rowData) {
        let headers = ['Preset', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'Average'];
        let head = document.createElement('thead');
        let body = document.createElement('tbody');

        for (let i=0; i < headers.length; i++) {
            let cell = document.createElement('th');
            cell.appendChild(document.createTextNode(headers[i]));
            head.appendChild(cell);
        }
        for (let row of rowData) {
            let rowElement = document.createElement('tr');
            for (let data of row) {
                let cell = document.createElement('td');
                let num = parseFloat(data);
                if (num) {
                    cell.appendChild(document.createTextNode(Util.round(num)));
                } else {
                    cell.appendChild(document.createTextNode(data));
                }
                
                rowElement.appendChild(cell);
            }
            body.appendChild(rowElement);
        }
        table.appendChild(head);
        table.appendChild(body);
    }
    static getPresetOptions(presets, parent) {
        presets.forEach(v => {
            let option = document.createElement('option');
            option.value = v[0];
            option.innerText = v[1];
            parent.appendChild(option);
        })
    }
}