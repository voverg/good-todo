// Select the elements
const clear = document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input');

// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

//Show today date
const options = {weekday: 'long', month: 'long', day: 'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('ru-RU', options);