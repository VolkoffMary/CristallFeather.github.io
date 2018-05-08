var xhr = new XMLHttpRequest();
var link = window.location.href;
var mark = link.indexOf("?id")+4;
var id = link.substring(mark,link.length);
var hrefLink='https://swapi.co/api/people/' + id;
xhr.open('GET', hrefLink, true);
var aHref = 'EditForm.html?id=' + id; 
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

    var dateOfBirth = document.getElementById('dateOfBirth');
    const birthday = new Date(CRUD.created)      
    dateOfBirth.innerHTML = dateOfBirth.innerHTML + birthday.toLocaleString(); 
    }

}
