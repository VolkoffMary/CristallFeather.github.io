var xhr = new XMLHttpRequest();
var link = window.location.href;
var mark = link.indexOf("?id")+4;
var id = link.substring(mark,link.length);
var hrefLink='https://swapi.co/api/people/' + id;
var aHref = 'FormView.html?id=' + id;   
document.getElementById('returnLink').setAttribute('href', aHref);
xhr.open('GET', hrefLink, true);


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
    fullName.setAttribute('value', CRUD.name);

    var gender = document.getElementById('gender');  
    gender.setAttribute('value', CRUD.gender);

    var workPhonenumber = document.getElementById('workPhonenumber');  
    workPhonenumber.setAttribute('value', CRUD.height);

    var homePhonenumber = document.getElementById('homePhonenumber');  
    homePhonenumber.setAttribute('value', CRUD.height);

    var job = document.getElementById('job');  
    job.setAttribute('value', CRUD.url);

    var homeLocation = document.getElementById('homeLocation');  
    homeLocation.setAttribute('value', CRUD.homeworld);

    var liveLocation = document.getElementById('liveLocation');  
    liveLocation.setAttribute('value', CRUD.homeworld);

    var workLocation = document.getElementById('workLocation');  
    workLocation.setAttribute('value', CRUD.homeworld);

    var hospitalLocation = document.getElementById('hospitalLocation');  
    hospitalLocation.setAttribute('value', CRUD.homeworld);

    var OMS = document.getElementById('OMS');  
    OMS.setAttribute('value', CRUD.mass);

    var DMS = document.getElementById('DMS');  
    DMS.setAttribute('value', CRUD.mass);

    var dateOfBirth = document.getElementById('dateOfBirth');
    const birthday = new Date(CRUD.created);
    dateOfBirth.setAttribute('value', birthday.toLocaleString());    
    }

}