// Select the elements
const clear = document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const ul = document.querySelector('#list');
const plusButton = document.querySelector('#plus-button');
const input = document.querySelector('#input');
// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';
// Variables
let taskList = [], deletedList = [], id = 0;

//Show today date
const options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('ru-RU', options);

// Add to-do UI function
function addToDo(toDo, id, done, trash) {
    if (trash) { 
        return;
    }
    // check if item is done
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';
    // create item UI
    const item = `
                <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;
    const position = 'beforeend';
    ul.insertAdjacentHTML(position, item);
}
//add to-do item to taskList array
function addItemToTaskList(toDo, id, done, trash) {
    taskList.push({
        name: toDo,
        id: id,
        done: done,
        trash: trash
    })
}

// Complete to do
function completeToDo (elem) {
    elem.classList.toggle(CHECK);
    elem.classList.toggle(UNCHECK);
    elem.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    taskList[elem.id].done = taskList[elem.id].done ? false : true;
}

// Remove to do
function removeToDo (elem) {
    elem.parentNode.parentNode.removeChild(elem.parentNode);
    taskList[elem.id].trash = true;

    deletedList.push(taskList[elem.id]);
}

// Event listeners
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
    if (toDo.trim() != '') {
        addToDo(toDo, id, false, false);
        addItemToTaskList(toDo, id, false, false);

        id++;
        input.value = '';
        input.focus();
    }
})

// Complite or remove tasks
list.addEventListener('click', function (event) {
    const elem = event.target;
    const elemJob = elem.attributes.job.value;
    if (elemJob == 'complete') {
        completeToDo(elem);
    } else  if (elemJob == 'delete') {
        removeToDo(elem);
    }
})