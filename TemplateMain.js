var header = document.getElementsByTagName('header')[0];
var footer = document.getElementsByTagName('footer')[0];

var logo = document.createElement('a');
var nav = document.createElement('div');
var patientList = document.createElement('a');
var emptySpace = document.createElement('div');
var signIn = document.createElement('a');
var logoImg = document.createElement('img');

header.appendChild(logo);
header.appendChild(nav);
nav.appendChild(patientList);
nav.appendChild(emptySpace);
nav.appendChild(signIn);

patientList.innerHTML = 'Пациенты';
signIn.innerHTML = 'Войти';
nav.setAttribute('id','nav');
logo.setAttribute('href', 'MainPage.html');
patientList.setAttribute('href', 'PatientList.html');
emptySpace.setAttribute('class', 'emptyspace');
patientList.setAttribute('class', 'nav-links');
signIn.setAttribute('class', 'nav-links');

logoImg.setAttribute('src','logo.png');
logoImg.setAttribute('height','64px');
logoImg.setAttribute('alt',"I'mabadprogrammer");
logo.setAttribute('id','logoLink');
logo.appendChild(logoImg);
