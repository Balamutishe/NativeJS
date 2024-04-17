import { createTodoItemElement } from "./view.js";

export async function getServerList(owner) {
  const response = await fetch(
    `http://localhost:3000/api/todos?owner=${owner}`
  );
  return await response.json();
}

export async function addServerItem({ owner, name, id, done }) {
  await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      owner,
      name,
      id,
      done,
    }),
  });
}

export async function onServerDone(todoItem) {
  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: "PATCH",
    body: JSON.stringify(todoItem),
    headers: { "Content-Type": "application/json" },
  });
}

export async function onServerDelete(element, id) {
  if (!confirm("Вы уверены")) {
    return;
  }

  element.remove();

  fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  });
}

export async function syncServerList(owner, container, handlers) {
  const arr = await getServerList(owner);

  container.innerHTML = "";

  arr.forEach((item) => {
    const itemElement = createTodoItemElement(item, handlers);
    container.append(itemElement);
  });
}
