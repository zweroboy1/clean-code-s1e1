const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".button_add");
const incompleteTaskHolder = document.querySelector(".todo__list");
const completedTasksHolder = document.querySelector(".completed__list");
const escapeSpecialChars = (str) => {
  return str.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "'");
};

function createNewTaskElement(taskString) {
  taskString = escapeSpecialChars(taskString);
  const listItem = document.createElement("li");
  listItem.className = "item__container";
  listItem.innerHTML = `<input class="item__checkbox" type="checkbox">
  <label class="item__label">${taskString}</label>
  <input class="item__input input-text" type="text" value="${taskString}">
  <button class="button button_edit">Edit</button>
  <button class="button button_delete" title="delete item"></button>`;
  return listItem;
}

function addTask() {
  console.log("Add Task...");
  if (!taskInput.value) {
    return;
  }
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".input-text");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".button_edit");
  if (listItem.classList.contains("item__container_edit-mode")) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("item__container_edit-mode");
}

function deleteTask() {
  console.log("Delete Task...");
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

function taskCompleted() {
  console.log("Complete Task...");
  const listItem = this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete Task...");
  const listItem = this.parentNode;
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest() {
  console.log("AJAX Request");
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  const checkBox = taskListItem.querySelector(".item__checkbox");
  const editButton = taskListItem.querySelector(".button_edit");
  const deleteButton = taskListItem.querySelector(".button_delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

addButton.addEventListener("click", addTask);
//addButton.addEventListener("click", ajaxRequest);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
