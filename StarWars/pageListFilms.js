function createElem(tag) {
  const elem = document.createElement(tag);
  return elem;
}

function createTitle(textTitle) {
  const title = createElem("h1");
  title.textContent = textTitle;
  title.classList.add("title", "main-title");

  return title;
}

function createList() {
  const list = createElem("ul");
  list.classList.add("list-reset", "list");

  return list;
}

function createListItem(element) {
  const listItem = createElem("li");

  listItem.classList.add("list-item");

  listItem.append(element);

  return listItem;
}

function createCard(item) {
  const card = createElem("div");
  const cardPreview = createElem("img");
  const cardBodyContent = createElem("div");
  const cardTitle = createElem("h5");
  const cardLink = createElem("a");

  if (item.episode_id > 3) {
    item.episode_id = item.episode_id - 3;
  } else {
    item.episode_id = item.episode_id + 3;
  }

  card.classList.add("card");

  cardPreview.src = `./img/${item.episode_id}.jpg`;
  cardPreview.alt = "Изображение превью эпизода";
  cardPreview.classList.add("card-img-top");

  cardBodyContent.classList.add("card-body");

  cardTitle.textContent = item.title;
  cardTitle.classList.add("title", "card-title");

  cardLink.textContent = "Подробнее о фильме";
  cardLink.classList.add("link", "link-film-details");
  cardLink.href = `?id=${item.episode_id}`;

  card.append(cardPreview);
  card.append(cardBodyContent);
  cardBodyContent.append(cardTitle);
  cardBodyContent.append(cardLink);

  return card;
}

export function render(data, textTitle) {
  const title = createTitle(textTitle);
  const list = createList();
  const container = createElem("div");
  console.log(data.results);

  data.results.forEach((item) => {
    const card = createCard(item);
    const listItem = createListItem(card);

    list.append(listItem);
  });

  container.append(title);
  container.append(list);

  return container;
}
