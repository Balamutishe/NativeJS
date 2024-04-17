const cssPromises = {};
const searchParams = new URLSearchParams(location.search);
const id = searchParams.get("id");

const appContainer = document.getElementById("root");

function loadResource(src) {
  if (src.endsWith(".js")) {
    return import(src);
  }

  if (src.endsWith(".css")) {
    if (!cssPromises[src]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;

      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener("load", () => resolve());
      });
      document.head.append(link);
    }

    return cssPromises[src];
  }

  return fetch(src).then((res) => res.json());
}

function renderPageMain(data, moduleName, css) {
  Promise.all([data, moduleName, css].map((src) => loadResource(src))).then(
    ([data, pageName]) => {
      appContainer.innerHTML = "";
      appContainer.append(pageName.render(data, "ФИЛЬМЫ О ЗВЕЗДНЫХ ВОЙНАХ"));
    }
  );
}

function renderPageDetail(data, moduleName, css) {
  Promise.all([data, moduleName, css].map((src) => loadResource(src))).then(
    async ([data, pageModule]) => {
      appContainer.innerHTML = "";
      appContainer.append(
        pageModule.render(
          data,
          await renderListDetail(pageModule, data.planets, "PLANETS"),
          await renderListDetail(pageModule, data.species, "SPECIES"),
          await renderListDetail(pageModule, data.starships, "STARSHIPS")
        )
      );
    }
  );
}

async function renderListDetail(pageModule, detailData, title) {
  const containerLists = document.createElement("div");
  const titleList = pageModule.createList(title).titleList;
  const list = pageModule.createList(title).list;

  [detailData].forEach((src) =>
    src.forEach(async (detailUrl) => {
      const detailData = await loadResource(detailUrl);
      const detailElement = pageModule.createListItem(detailData.name);

      list.append(detailElement);
    })
  );

  containerLists.classList.add("container-list-details");

  containerLists.append(titleList);
  containerLists.append(list);

  return containerLists;
}

if (id) {
  renderPageDetail(
    `https://swapi.dev/api/films/${id}`,
    "./pageDetailsFilm.js",
    "./style.css"
  );
} else {
  renderPageMain(
    "https://swapi.dev/api/films/",
    "./pageListFilms.js",
    "./style.css"
  );
}
