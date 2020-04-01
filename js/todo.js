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
let taskList, id, icons;

// Get data from localStorage
let data = localStorage.getItem('taskList');
if (data) {
    taskList = JSON.parse(data);
    id = taskList.length;

    loadList(taskList);
} else {
    taskList = [];
    id = 0;
}
// Creat UI of loaded taskList from localStorage
function loadList(array) {
    ul.innerHTML = '';
    array.forEach(function(item) {
        if (!item.trash) {
            addToDo(item.name, item.id, item.done, item.trash);
        }
    });
}
// Set data to localStorage
function addDataToLocalStorage() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

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

    addDataToLocalStorage();
}

// Complete to do
function completeToDo(elem) {
    elem.classList.toggle(CHECK);
    elem.classList.toggle(UNCHECK);
    elem.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    taskList[elem.id].done = taskList[elem.id].done ? false : true;

    addDataToLocalStorage();
}

// Remove to do
function removeToDo(elem) {
    elem.parentNode.parentNode.removeChild(elem.parentNode);
    taskList[elem.id].trash = true;

    addDataToLocalStorage();
}

// Search function
function searchFilter(array, val) {
    ul.innerHTML = '';
    array.forEach(function(item) {
        let text = item.name.toLowerCase();
        if (!item.trash && text.includes(val)) {
            text = `${text.slice(0, text.search(val))}<mark>${val}</mark>${text.slice(text.search(val) + val.length)}`;
            addToDo(text, item.id, item.done, item.trash);
        }
    });
}
// Change plusButton icon
function changePlusButton () {
        plusButton.classList.remove(icons[0], icons[1]);
        plusButton.classList.add(icons[2]);
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
    if (plusButton.classList.contains('fa-plus-circle') && toDo.trim() != '') {
        addToDo(toDo, id, false, false);
        addItemToTaskList(toDo, id, false, false);

        id++;
        input.value = '';
    } else if (plusButton.classList.contains('fa-close')) {
        input.value = ''; 
        icons = ['fa-close', 'fa-search', 'fa-plus-circle'];
        changePlusButton(icons);
        loadList(taskList);
    }
    input.focus();
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
    input.focus();
})

// Clear localStorage
clear.addEventListener('click', function () {
    const result = confirm('Эй, ты, точно хочешь удалить все задачи?');
    if (result) {
        localStorage.clear();
        location.reload();
    }
})

// Search filter
input.addEventListener('input', function () {
    let val = input.value.toLowerCase().trim();
    if (val == '/' && val.length == 1) {
        icons = ['fa-plus-circle', 'fa-close', 'fa-search'];
        changePlusButton(icons);
        loadList(taskList);
    } else if (val[0] == '/' && val.length > 1) {
        icons = ['fa-search', 'fa-plus-circle', 'fa-close'];
        changePlusButton(icons);

        val = val.slice(1);
        searchFilter(taskList, val);
    } else {
        icons = ['fa-search', 'fa-close', 'fa-plus-circle'];
        changePlusButton(icons);
    }
})
