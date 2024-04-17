import { createTodoItemElement } from "./view.js";

export function saveLocalList(arr, owner) {
  localStorage.setItem(owner, JSON.stringify(arr));
}

export function getLocalList(owner) {
  const localData = localStorage.getItem(owner);
  let rawList = [];

  if (localData !== null && localData !== "") {
    rawList = JSON.parse(localData);
  } else {
    return [];
  }

  return rawList;
}

export function syncLocalList(owner, container, handlers) {
  const arr = getLocalList(owner);

  container.innerHTML = "";

  arr.forEach((item) => {
    const itemElement = createTodoItemElement(item, handlers);
    container.append(itemElement);
  });
}

export function addLocalItem({ owner, name, id, done }) {
  let arr = getLocalList(owner);

  arr = [...arr, { owner, name, id, done }];

  saveLocalList(arr, owner);
}

export function onLocalDone(todoItem, owner, event) {
  let arr = getLocalList(owner);
  let id = event.currentTarget.id;

  arr = arr.map((item) => {
    if (item.id === id) {
      return { ...item, done: (item.done = !item.done) };
    }

    return item;
  });

  saveLocalList(arr, owner);
}

export function onLocalDelete(element, id, owner) {
  if (!confirm("Вы уверены")) {
    return;
  }
  let arr = getLocalList(owner);
  arr = arr.filter((item) => item.id !== id);

  element.remove();

  saveLocalList(arr, owner);
}
