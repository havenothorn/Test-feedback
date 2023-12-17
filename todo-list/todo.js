const toDoForm = document.querySelector(".todo__form");
const toDoInput = document.querySelector(".todo__form input");
const toDoAddBtn = document.querySelector(".todo__form button");
const toDoList = document.querySelector(".todo__list");
const toDoItems = document.querySelectorAll(".todo__list-item input");
const toDoDeleteBtn = document.querySelectorAll(".item--deleted");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function finishedToDo(event) {
  const input = event.target;
  const span = input.nextElementSibling;

  if (input.checked === span.classList.contains("finished")) {
    input.checked = false;
    span.classList.remove("finished");
  } else {
    input.checked = true;
    span.classList.add("finished");
  }
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  li.classList.add("todo__list-item");

  const input = document.createElement("input");
  input.type = "radio";
  input.addEventListener("click", finishedToDo);

  const span = document.createElement("span");
  span.innerText = newTodo.text;
  span.classList.add("item__txt");

  const button = document.createElement("button");
  button.innerText = "X";
  button.classList.add("item--deleted");
  button.addEventListener("click", deleteToDo);

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);
toDoItems.forEach((item) => {
  item.addEventListener("click", finishedToDo);
});

toDoDeleteBtn.forEach((btn) => {
  btn.addEventListener("click", deleteToDo);
});

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintTodo);
}
