var xhr = new XMLHttpRequest();
var link = window.location.href;
var mark = link.indexOf("?id")+4;
var id = link.substring(mark,link.length);
<<<<<<< HEAD
var hrefLink = 'doctors/' + id;
=======
var hrefLink='/doctors/' + id;
>>>>>>> f04634c237a51d4bcc33e2385e56fb37cd3b9a75
xhr.open('GET', hrefLink, true);
var aHref = 'EditDoctor.html?act=upd&id=' + id; 
document.getElementById('changeData').setAttribute('href', aHref);


xhr.send();



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
    fullName.innerHTML = fullName.innerHTML + CRUD.name;

    var phonenumber = document.getElementById('phonenumber');  
    phonenumber.innerHTML = phonenumber.innerHTML + CRUD.phonenumber;

    var job = document.getElementById('job');  
    job.innerHTML = job.innerHTML + CRUD.job;

    var hospitalLocation = document.getElementById('hospitalLocation');  
    hospitalLocation.innerHTML = hospitalLocation.innerHTML + CRUD.hospitalLocation;
    }

}
