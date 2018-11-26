var header = document.getElementsByTagName('header')[0];
var footer = document.getElementsByTagName('footer')[0];

var logo = document.createElement('a');
var nav = document.createElement('div');
var emptySpace = document.createElement('div');
var logoImg = document.createElement('img');

header.appendChild(logo);
header.appendChild(nav);
nav.appendChild(emptySpace);

nav.setAttribute('id','nav');
logo.setAttribute('href', 'MainPage.html');
emptySpace.setAttribute('class', 'emptyspace');

logoImg.setAttribute('src','logo.png');
logoImg.setAttribute('height','64px');
logoImg.setAttribute('alt',"I'mabadprogrammer");
logo.setAttribute('id','logoLink');
logo.appendChild(logoImg);
