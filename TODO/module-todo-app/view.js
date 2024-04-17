import {
  syncLocalList,
  addLocalItem,
  onLocalDone,
  onLocalDelete,
} from "./localStorage.js";

import {
  addServerItem,
  onServerDone,
  onServerDelete,
  syncServerList,
} from "./serverStorage.js";

const owner = document.getElementById("title-list").textContent;

function createTodoItemForm() {
  let form = document.createElement("form");
  let input = document.createElement("input");
  let buttonWrapper = document.createElement("div");
  let button = document.createElement("button");

  form.classList.add("input-group", "mb-3");
  input.classList.add("form-control");
  input.placeholder = "Введите название нового дела";
  buttonWrapper.classList.add("input-group-append");
  button.classList.add("btn", "btn-primary");
  button.textContent = "Добавить дело";
  button.disabled = true;

  input.addEventListener("input", function () {
    if (input.value !== "") {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  let list = document.createElement("ul");
  list.classList.add("list-group");
  return list;
}

export function createTodoItemElement(todoItem, { onDone, onDelete }) {
  const doneClass = "list-group-item-success";

  let rowList = document.createElement("li");
  let buttonGroup = document.createElement("div");
  let doneButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  rowList.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  if (todoItem.done) {
    rowList.classList.add(doneClass);
  }
  rowList.textContent = todoItem.name;

  buttonGroup.classList.add("btn-group", "btn-group-sm");
  doneButton.classList.add("btn", "btn-success");
  doneButton.id = todoItem.id;
  doneButton.textContent = "Готово";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.id = todoItem.id;
  deleteButton.textContent = "Удалить";

  doneButton.addEventListener("click", function (event) {
    onDone(todoItem, owner, event);

    rowList.classList.toggle(doneClass);
  });

  deleteButton.addEventListener("click", function () {
    onDelete(rowList, deleteButton.id, owner);
  });

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  rowList.append(buttonGroup);

  return rowList;
}

async function createTodoApp(
  container,
  owner,
  { onCreateFormSubmit, onDoneClick, onDeleteClick, syncTodoItemList }
) {
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

  container.innerHTML = "";
  container.append(todoItemForm.form);
  container.append(todoList);

  await syncTodoItemList(owner, todoList, handlers);

  todoItemForm.form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }

    await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim(),
      id: crypto.randomUUID(),
      done: false,
    });

    await syncTodoItemList(owner, todoList, handlers);

    todoItemForm.button.disabled = true;

    todoItemForm.input.value = "";
  });
}

async function changeStorage() {
  let objLocalImport = {
    onCreateFormSubmit: addLocalItem,
    onDoneClick: onLocalDone,
    onDeleteClick: onLocalDelete,
    syncTodoItemList: syncLocalList,
  };

  let objServerImport = {
    onCreateFormSubmit: addServerItem,
    onDoneClick: onServerDone,
    onDeleteClick: onServerDelete,
    syncTodoItemList: syncServerList,
  };

  const buttonChangeStorage = document.getElementById("buttonChangeStorage");
  buttonChangeStorage.local = true;
  buttonChangeStorage.textContent = "Локальное хранилище";

  await createTodoApp(
    document.getElementById("todo-app"),
    owner,
    objLocalImport
  );

  buttonChangeStorage.addEventListener("click", async () => {
    buttonChangeStorage.local = !buttonChangeStorage.local;

    buttonChangeStorage.local
      ? (buttonChangeStorage.textContent = "Локальное хранилище")
      : (buttonChangeStorage.textContent = "Серверное хранилище");

    await createTodoApp(
      document.getElementById("todo-app"),
      owner,
      buttonChangeStorage.local ? objLocalImport : objServerImport
    );
  });
}

await changeStorage();
