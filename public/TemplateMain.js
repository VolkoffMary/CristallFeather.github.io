var header = document.getElementsByTagName('header')[0];
var footer = document.getElementsByTagName('footer')[0];

var logo = document.createElement('a');
var nav = document.createElement('div');
var emptySpace = document.createElement('div');
var logoTitle = document.createElement('h1');

header.appendChild(logo);
header.appendChild(nav);
nav.appendChild(emptySpace);

nav.setAttribute('id','nav');
logo.setAttribute('href', 'MainPage.html');
emptySpace.setAttribute('class', 'emptyspace');

logo.appendChild(logoTitle);
