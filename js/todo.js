// Select the elements
const clear = document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const ul = document.querySelector('#list');
const input = document.querySelector('#input');
const plusButton = document.querySelector('#plus-button');
// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';
// Variables
let taskList = [], id = 0;

//Show today date
const options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('ru-RU', options);

// Add to-do function
function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';

    const item = `
                <li class="item">
                    <i class="fa ${DONE} co" job="complite" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;
    const position = 'beforeend';
    ul.insertAdjacentHTML(position, item);
}
//add to-do item to taskList
function addItemToTaskList(toDo, id, done, trash) {
    taskList.push({
        name: toDo,
        id: id,
        done: done,
        trash: trash
    })
}
// Add item to the list by user enter key
input.addEventListener('keyup', function(event) {
    const toDo = input.value;
    if (event.keyCode == 13 && toDo.trim() != '') {
        addToDo(toDo, id, false, false);
        addItemToTaskList(toDo, id, false, false);

        id++;
        input.value = '';
    }
})
// Add item to the list by click plus button
plusButton.addEventListener('click', function() {
    const toDo = input.value;
    if (input.value.trim() != '') {
        addToDo(toDo, id, false, false);
        addItemToTaskList(toDo, id, false, false);

        id++;
        input.value = '';
        input.focus();
    }
})