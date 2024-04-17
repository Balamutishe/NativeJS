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

export function createList(title) {
  const titleList = createElem("h5");
  const list = createElem("ul");

  list.classList.add("list-reset", "list", "list-film-details");
  titleList.classList.add("title", "list-film-details-title");

  titleList.textContent = title;

  return { list, titleList };
}

export function createListItem(text) {
  const listItem = createElem("li");

  listItem.classList.add("list-item");

  listItem.textContent = text;

  return listItem;
}

function createDescr(text) {
  const containerDescr = createElem("div");
  const descr = createElem("p");

  descr.classList.add("film-description");
  descr.textContent = text;
  containerDescr.append(descr);

  return containerDescr;
}

function createButtonReturn() {
  const button = createElem("a");

  button.textContent = "Назад на главную";
  button.classList.add("link", "link-return");

  button.addEventListener("click", () => {
    window.history.back();
  });

  return button;
}

export function render(
  data,
  detailsListPlanets,
  detailsListSpecies,
  detailsListStarships
) {
  const page = createElem("div");
  const pageHeader = createElem("div");
  const title = createTitle(data.title);
  const buttonReturn = createButtonReturn();
  const descr = createDescr(data.opening_crawl);
  const containerDetailLists = createElem("div");

  containerDetailLists.classList.add("container-lists-details");

  containerDetailLists.append(detailsListPlanets);
  containerDetailLists.append(detailsListSpecies);
  containerDetailLists.append(detailsListStarships);

  pageHeader.append(title);
  pageHeader.append(buttonReturn);
  page.append(pageHeader);
  page.append(descr);
  page.append(containerDetailLists);

  return page;
}
