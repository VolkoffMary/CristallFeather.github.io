var xhr = new XMLHttpRequest();

xhr.open('GET', 'http://localhost:8080/api/', true);


xhr.send();



xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        try {
            var befErr = JSON.parse(xhr.responseText);
        } catch (e) {
            alert( "Некорректный ответ " + e.message );
        }
        // вывести результат
        var CRUD = JSON.parse(xhr.responseText);
        var patientList = CRUD;
        createTable(patientList);
    }

}

function createTable(patientList) {
    var id=1;  
    var table = document.getElementById('table'); 
    patientList.forEach(function(patient) {
        var tr = table.appendChild(document.createElement('tr'));
        var namePlaceholder = tr.appendChild(document.createElement('td'));
        var name = namePlaceholder.appendChild(document.createElement('a'));
        var time = tr.appendChild(document.createElement('td'));
        name.innerHTML = patient.name;
        var aHref = 'FormView.html?id=' + id;   
        name.setAttribute('href', aHref);
        time.innerHTML = patient.created;   
        namePlaceholder.setAttribute('width', '90%');
        id++;
    });
}