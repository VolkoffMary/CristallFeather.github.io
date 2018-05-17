var xhr = new XMLHttpRequest();
var link = window.location.href;
var mark = link.indexOf("?id")+4;
var id = link.substring(mark,link.length);
var hrefLink='doctors/' + id;
var aHref = 'DoctorView.html?id=' + id;   
document.getElementById('returnLink').setAttribute('href', aHref);
xhr.open('GET', hrefLink, true);

xhr.send();

var form = document.getElementById('formId');
form.setAttribute('action', '/doctors/'+id);

xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
    // обработать ошибку
    alert(xhr.status + ': ' + xhr.statusText);
    } else {
    // вывести результат
    var CRUD = JSON.parse(xhr.responseText);

    var title = document.getElementsByTagName('title')[0];
    title.innerHTML = CRUD.name;

    var fullName = document.getElementById('name');  
    fullName.setAttribute('value', CRUD.name);

    var phonenumber = document.getElementById('phonenumber');  
    phonenumber.setAttribute('value', CRUD.phonenumber);

    var job = document.getElementById('job');  
    job.setAttribute('value', CRUD.job);

    var hospitalLocation = document.getElementById('hospitalLocation');  
    hospitalLocation.setAttribute('value', CRUD.hospitalLocation);
    }

}
