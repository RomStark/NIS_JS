var number = 0;
var mass = [];
var sumOfCol = 0;
var colLimit = 0;

function readFile() {
    let file = document.getElementById('file').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    clearAll();
    number = 0;
    mass = [];
    sumOfCol = 0;
    reader.onload = function() {
        let arr = reader.result.split('\n');
        
        for (i = 0; i < arr.length - 1; i++) {
            let str = arr[i].split(",");
            mass[i] = [str[0], Number(str[1])]
            sumOfCol += Number(str[1])
            changeLabels()
            appendCol()
        }
    }
    reader.onerror = function() {
        
    }

}

function downloadToCSV(el) {
    let csvContent = "data:text/csv;charset=utf-8,";

    mass.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); 
    link.click();
}

function changeLabels() {
    var label = document.getElementById('label');
    var labelOfSUm = document.getElementById('labelOfSum');
    var limit = document.getElementById('limitButton');

    number++;
    label.innerHTML = "количество пунктов: " + number;
    labelOfSUm.innerHTML = " сумма калорий: " + sumOfCol;
    limit.innerHTML = "доступно калорий: " + String(colLimit - sumOfCol);
}

function appendCol() {
    let list = document.querySelector('ul');
    let li_1 = document.createElement('li');
    li_1.innerHTML = "название: " + mass[number - 1][0] +  " калорий: " + mass[number - 1][1];
    list.append(li_1);
}
function clearAll() {
    number = -1;
    mass = []
    sumOfCol = 0;
    changeLabels();

    let li = document.querySelector("ul.list > li:last-child");
    while (li != null) {
        li.remove();
        li = document.querySelector('ul.list > li:last-child');
    }
    
}

function checkForm(el) {
    // var el = document.getElementById('main-form');
    var name = el.name.value;
    var count = el.col.value;
    mass[number] = [];
    mass[number][0] = name;
    mass[number][1] = Number(count);
    sumOfCol += Number(count);
    changeLabels();
    appendCol();
    

    return false
}

function setLimit(el) {
    // var el = document.getElementById('main-form');
    var limit = el.limit.value;
    colLimit = Number(limit)
    
    var label = document.getElementById('limitButton');
    
    label.innerHTML = "доступно калорий: " + String(limit - sumOfCol);

    return false
}

document.getElementById('col').onkeydown = function (e) {
    return !(/^[А-Яа-яA-Za-z ]$/.test(e.key));  // IE > 9
}


