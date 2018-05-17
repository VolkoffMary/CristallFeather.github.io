var xhr = new XMLHttpRequest();
var link = window.location.href;
var mark = link.indexOf("?id")+4;
var id = link.substring(mark,link.length);
var hrefLink = 'patients/' + id;
xhr.open('GET', hrefLink, true);
var aHref = 'EditForm.html?id=' + id; 
document.getElementById('changeData').setAttribute('href', aHref);
document.getElementById('deleteData').setAttribute('onload', 'deleteData(' + hrefLink + ')');

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

    var dateOfBirth = document.getElementById('dateOfBirth');
    const birthday = new Date(CRUD.dateOfBirth)      
    dateOfBirth.innerHTML = dateOfBirth.innerHTML + birthday.toLocaleString(); 

    var gender = document.getElementById('gender');  
    gender.innerHTML = gender.innerHTML + CRUD.gender;

    var workPhonenumber = document.getElementById('workPhonenumber');  
    workPhonenumber.innerHTML = workPhonenumber.innerHTML + CRUD.workPhonenumber;

    var homePhonenumber = document.getElementById('homePhonenumber');  
    homePhonenumber.innerHTML = homePhonenumber.innerHTML + CRUD.homePhonenumber;

    var job = document.getElementById('job');  
    job.innerHTML = job.innerHTML + CRUD.job;

    var homeLocation = document.getElementById('homeLocation');  
    homeLocation.innerHTML = homeLocation.innerHTML + CRUD.homeLocation;

    var liveLocation = document.getElementById('liveLocation');  
    liveLocation.innerHTML = liveLocation.innerHTML + CRUD.liveLocation;

    var workLocation = document.getElementById('workLocation');  
    workLocation.innerHTML = workLocation.innerHTML + CRUD.workLocation;

    var hospitalLocation = document.getElementById('hospitalLocation');  
    hospitalLocation.innerHTML = hospitalLocation.innerHTML + CRUD.hospitalLocation;

    var OMS = document.getElementById('OMS');  
    OMS.innerHTML = OMS.innerHTML + CRUD.OMS;

    var DMS = document.getElementById('DMS');  
    DMS.innerHTML = DMS.innerHTML + CRUD.DMS;
    }

}
