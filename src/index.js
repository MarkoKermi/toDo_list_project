import './style.css';

const updateLocalStorage = (toDoListArray) => {
  localStorage.setItem('toDoList', JSON.stringify(toDoListArray));
};

const getLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem('toDoList'));
  let toDoListArray;
  if (localStorageData) {
    toDoListArray = localStorageData;
  } else {
    toDoListArray = [];
  }
  return toDoListArray;
};

const toDoTasks = getLocalStorage();
const toDoList = document.querySelector('.toDo_list_ul');

const addTask = (toDoListArray, task) => {
  toDoListArray.push({ task, id: toDoListArray.length + 1 });
};

const renderToDoList = (toDoListArray) => {
  toDoList.innerHTML = '';

  toDoListArray = getLocalStorage();

  toDoListArray.forEach((toDo) => {
    const toDoItem = document.createElement('li');
    toDoItem.classList.add('todo-list-li');

    const toDoCheckbox = document.createElement('input');
    toDoCheckbox.classList.add('todo-list-li-checkbox');
    toDoCheckbox.type = 'checkbox';
    toDoItem.appendChild(toDoCheckbox);

    const toDoText = document.createElement('input');
    toDoText.classList.add('todo-list-li-text');
    toDoText.value = toDo.task;
    toDoItem.appendChild(toDoText);

    if (toDo.completed) {
      toDoText.classList.add('completed');
    }

    const crossIcon = document.createElement('span');
    crossIcon.classList.add('todo-list-li-cross');
    crossIcon.innerHTML = 'x';
    toDoItem.appendChild(crossIcon);

    toDoList.appendChild(toDoItem);
  });
};

const deleteTask = (e, toDoListArray) => {
  const clickedCross = e.target.closest('.todo-list-li-cross');
  const clickedTask = clickedCross.previousElementSibling;
  const taskIndex = toDoListArray.findIndex(
    (task) => task.task === clickedTask.value,
  );
  toDoListArray.splice(taskIndex, 1);
  toDoListArray.forEach((task, index) => {
    task.id = index + 1;
  });
  updateLocalStorage(toDoListArray);
  renderToDoList(toDoListArray);
};

const markTask = (e, toDoListArray) => {
  const clickedCheckbox = e.target.closest('.todo-list-li-checkbox');
  const clickedTask = clickedCheckbox.nextElementSibling;
  const taskIndex = toDoListArray.findIndex(
    (task) => task.task === clickedTask.value,
  );
  toDoListArray[taskIndex].completed = !toDoListArray[taskIndex].completed;
  updateLocalStorage(toDoListArray);
  renderToDoList(toDoListArray);
};

const input = document.querySelector('.task-input');
const todoList = document.querySelector('.toDo_list_ul');
const clearCompletedBtn = document.querySelector('.clearbtn');
const addTaskBtn = document.querySelector('.add_btn');

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && input.value !== '') {
    addTask(toDoTasks, input.value);
    input.value = '';
    updateLocalStorage(toDoTasks);
    renderToDoList(toDoTasks);
  }
});

addTaskBtn.addEventListener('click', () => {
  if (input.value !== '') {
    addTask(toDoTasks, input.value);
    input.value = '';
    updateLocalStorage(toDoTasks);
    renderToDoList(toDoTasks);
  }
});

todoList.addEventListener('click', (e) => {
  if (e.target.closest('.todo-list-li-checkbox')) {
    markTask(e, toDoTasks);
  }
});

clearCompletedBtn.addEventListener('click', () => {
  const toDoList = clearCompletedBtn(toDoTasks);
  updateLocalStorage(toDoList);
  renderToDoList(toDoList);
});

todoList.addEventListener('click', (e) => {
  if (e.target.closest('.todo-list-li-cross')) {
    deleteTask(e, toDoTasks);
  }
});

renderToDoList(toDoTasks);
