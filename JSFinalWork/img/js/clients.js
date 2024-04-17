(async function () {
  const SERVER_URL = `http://localhost:3000/api/clients`;
  let prop = "id";
  let dir = false;

  const clientsList = await getClientsData();

  const tableClients = createTable();
  const tableBody = tableClients.tableBody;
  const tableLoader = tableClients.tableContainerLoader;
  tableLoader.classList.add("container-loader--visible");
  document.getElementById("main").append(tableClients.tableContainer);

  const clientForm = createForm();
  document.getElementById("modal").append(clientForm.form);

  const modalOverlay = document.getElementById("modal-overlay");
  const modal = document.getElementById("modal");

  // получение данных с сервера

  async function getClientsData() {
    const response = await fetch(SERVER_URL);
    let clientsData = await response.json();

    let clientsListCopy = [...clientsData];

    return clientsListCopy;
  }

  async function responseValid(response, clientData) {
    const clientsList = await getClientsData();

    if (response.ok) {
      modalOverlay.classList.remove("modal-overlay--visible");
      modal.classList.remove("modal--visible");
      clientForm.formContainerError.innerHTML = "";
      tableBody.innerHTML = "";
      tableLoader.classList.add("container-loader--visible");

      setTimeout(() => {
        tableAdd(clientsList, clientForm, tableBody);
      }, 1000);
    } else {
      clientForm.formContainerError.innerHTML = "";
      clientData.errors.forEach((err) => {
        let error = createElem("div");
        error.textContent = `Ошибка: ${err.message}`;
        clientForm.formContainerError.append(error);
      });
      return;
    }
  }

  async function responseData(url, method, data) {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const clientData = await response.json();

    await responseValid(response, clientData);
    formInputLabelVisible();
  }

  function createElem(tag) {
    tag = document.createElement(tag);

    return tag;
  }

  function datetimeValid(date) {
    let newDate = new Date(date);
    let yyyy = newDate.getFullYear();
    let dd = validElemDate(newDate.getDate());
    let mm = validElemDate(newDate.getMonth() + 1);
    let hours = validElemDate(newDate.getHours());
    let minutes = validElemDate(newDate.getMinutes());
    let seconds = validElemDate(newDate.getSeconds());
    let fullDate = `${dd}.${mm}.${yyyy}`;
    let fullTime = `${hours}:${minutes}`;

    function validElemDate(elemDate) {
      if (elemDate < 10) {
        elemDate = "0" + elemDate;
      }
      return elemDate;
    }

    return {
      fullDate,
      fullTime,
    };
  }

  // создание и действия таблицы

  function createTable() {
    const tableContainer = createElem("div");
    const table = createElem("table");
    const tableHead = createElem("thead");
    const tableHeadId = createElem("th");
    const tableHeadFIO = createElem("th");
    const tableHeadDateCreate = createElem("th");
    const tableHeadDateChange = createElem("th");
    const tableHeadContacts = createElem("th");
    const tableHeadActions = createElem("th");
    const tableBody = createElem("tbody");
    const tableButtonMainContainer = createElem("div");
    const tableButtonMain = createElem("button");
    const tableContainerLoader = createElem("tr");
    const tableLoader = createElem("div");

    table.classList.add("table");

    tableHead.classList.add("table-head");

    tableHeadId.classList.add("table-head__item");
    tableHeadId.setAttribute("data-value", "id");
    tableHeadId.innerHTML = `ID <svg data-target='id' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_221_918)">
    <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/>
    </g>
    <defs>
    <clipPath id="clip0_221_918">
    <rect width="12" height="12" fill="white"/>
    </clipPath>
    </defs>
    </svg>`;

    tableHeadFIO.classList.add("table-head__item");
    tableHeadFIO.setAttribute("data-value", "name");
    tableHeadFIO.innerHTML = `Фамилия Имя Отчество <svg data-target='name' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_221_918)">
    <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/>
    </g>
    <defs>
    <clipPath id="clip0_221_918">
    <rect width="12" height="12" fill="white"/>
    </clipPath>
    </defs>
    </svg>`;

    tableHeadDateCreate.classList.add("table-head__item");
    tableHeadDateCreate.setAttribute("data-value", "createdAt");
    tableHeadDateCreate.innerHTML = `Дата и время создания <svg data-target='createdAt' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_221_918)">
    <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/>
    </g>
    <defs>
    <clipPath id="clip0_221_918">
    <rect width="12" height="12" fill="white"/>
    </clipPath>
    </defs>
    </svg>`;

    tableHeadDateChange.classList.add("table-head__item");
    tableHeadDateChange.setAttribute("data-value", "updatedAt");
    tableHeadDateChange.innerHTML = `Последние изменения <svg data-target='updatedAt' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_221_918)">
    <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/>
    </g>
    <defs>
    <clipPath id="clip0_221_918">
    <rect width="12" height="12" fill="white"/>
    </clipPath>
    </defs>
    </svg>`;

    tableHeadContacts.classList.add("table-head__item");
    tableHeadContacts.setAttribute("data-value", "contacts");
    tableHeadContacts.innerHTML = `Контакты`;

    tableHeadActions.classList.add("table-head__item");
    tableHeadActions.setAttribute("data-value", "actions");
    tableHeadActions.innerHTML = `Действия`;

    tableBody.classList.add("table-body");
    tableBody.setAttribute("id", "table-body");

    tableButtonMainContainer.classList.add("btn-main-container");

    tableButtonMain.classList.add("btn", "table-btn-main");
    tableButtonMain.innerHTML = `<svg
            class="table-btn-main-icon"
            width="23"
            height="16"
            viewBox="0 0 23 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z"
              fill="#9873FF"
            />
          </svg> Добавить клиента`;

    tableContainerLoader.classList.add("container-loader");

    tableLoader.classList.add("loader");

    tableContainer.append(
      table,
      tableContainerLoader,
      tableButtonMainContainer
    );
    table.append(tableHead, tableBody);
    tableHead.append(
      tableHeadId,
      tableHeadFIO,
      tableHeadDateCreate,
      tableHeadDateChange,
      tableHeadContacts,
      tableHeadActions
    );
    tableContainerLoader.append(tableLoader);
    tableButtonMainContainer.append(tableButtonMain);

    return {
      tableContainer,
      table,
      tableBody,
      tableHead,
      tableHeadId,
      tableHeadFIO,
      tableHeadDateCreate,
      tableHeadDateChange,
      tableHeadContacts,
      tableHeadActions,
      tableContainerLoader,
      tableButtonMain,
    };
  }

  function createTableRow(clientItem) {
    const row = createElem("tr");
    const clientId = createElem("td");
    const clientName = createElem("td");
    const clientDateСreation = createElem("td");
    const clientDateСhange = createElem("td");
    const dateCreate = createElem("span");
    const timeCreate = createElem("span");
    const dateChange = createElem("span");
    const timeChange = createElem("span");
    const clientContacts = createElem("td");
    const rowButtons = createElem("td");
    const buttonContainer = createElem("div");
    const buttonChangeContainer = createElem("div");
    const buttonChange = createElem("button");
    const buttonChangeIcon = createElem("span");
    const buttonDeleteContainer = createElem("div");
    const buttonDelete = createElem("button");
    const buttonDeleteIcon = createElem("span");

    clientItem.contacts.forEach((item) => {
      let contactContainer = createElem("a");
      let contactTooltip = createElem("span");
      let contactItemType = item.type.toString();
      let contactItemValue = item.value.toString();
      contactTooltip.textContent = contactItemValue;

      contactContainer.classList.add("form-contact-item");
      contactTooltip.classList.add("form-contact-item__tooltip");

      if (
        item.type.includes("Телефон") == true ||
        item.type.includes("Доп") == true
      ) {
        contactContainer.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
        <circle cx="8" cy="8" r="8" fill="#9873FF"/>
        <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
        </g>
        </svg>`;
      }

      if (item.type.includes("Email") == true) {
        contactContainer.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
        </svg>`;
      }

      if (item.type.includes("Vk") == true) {
        contactContainer.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
        <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
        </g>
        </svg>`;
      }

      contactContainer.append(contactTooltip);
      clientContacts.append(contactContainer);
    });

    row.classList.add("table-tr");
    clientId.classList.add("table-tr__item");
    clientName.classList.add("table-tr__item");
    clientDateСreation.classList.add("table-tr__item");
    clientDateСhange.classList.add("table-tr__item");
    clientContacts.classList.add("table-tr__item");
    rowButtons.classList.add("table-tr__item");
    buttonContainer.classList.add("table-btn-group");
    buttonChangeContainer.classList.add("table-btn-container");
    buttonDeleteContainer.classList.add("table-btn-container");
    dateCreate.classList.add("table-tr__date");
    timeCreate.classList.add("table-tr__time");
    dateChange.classList.add("table-tr__date");
    timeChange.classList.add("table-tr__time");

    buttonChange.classList.add(
      "btn-reset",
      "btn",
      "table-btn",
      "table-btn--edit"
    );

    buttonDelete.classList.add(
      "btn-reset",
      "btn",
      "table-btn",
      "table-btn--cancel"
    );

    clientId.textContent = clientItem.id.slice(0, 6);
    clientId.id = "clientId";
    clientName.textContent =
      clientItem.surname + " " + clientItem.name + " " + clientItem.lastName;

    dateCreate.textContent = datetimeValid(clientItem.createdAt).fullDate;
    timeCreate.textContent = datetimeValid(clientItem.createdAt).fullTime;
    dateChange.textContent = datetimeValid(clientItem.updatedAt).fullDate;
    timeChange.textContent = datetimeValid(clientItem.updatedAt).fullTime;

    buttonChange.textContent = "Изменить";
    buttonChangeIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7" clip-path="url(#clip0_121_2280)">
    <path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>
    </g>
    <defs>
    <clipPath id="clip0_121_2280">
    <rect width="16" height="16" fill="white"/>
    </clipPath>
    </defs>
    </svg>`;

    buttonChange.addEventListener("click", function () {
      buttonChangeIcon.innerHTML = `<svg class='table-btn-loader' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_224_2771)">
      <path d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
      </g>
      <defs>
      <clipPath id="clip0_224_2771">
      <rect width="16" height="16" fill="white"/>
      </clipPath>
      </defs>
      </svg>`;

      setTimeout(() => {
        buttonChangeIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7" clip-path="url(#clip0_121_2280)">
        <path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>
        </g>
        <defs>
        <clipPath id="clip0_121_2280">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
        </svg>`;
      }, 1000);
    });

    buttonDelete.textContent = "Удалить";
    buttonDeleteIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7" clip-path="url(#clip0_121_2305)">
    <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
    </g>
    <defs>
    <clipPath id="clip0_121_2305">
    <rect width="16" height="16" fill="white"/>
    </clipPath>
    </defs>
    </svg>`;

    buttonDelete.addEventListener("click", function () {
      buttonDeleteIcon.innerHTML = `<svg class='table-btn-loader' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_224_2771)">
      <path d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
      </g>
      <defs>
      <clipPath id="clip0_224_2771">
      <rect width="16" height="16" fill="white"/>
      </clipPath>
      </defs>
      </svg>`;

      setTimeout(() => {
        buttonDeleteIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7" clip-path="url(#clip0_121_2305)">
        <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
        </g>
        <defs>
        <clipPath id="clip0_121_2305">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
        </svg>`;
      }, 1000);
    });

    row.append(
      clientId,
      clientName,
      clientDateСreation,
      clientDateСhange,
      clientContacts,
      rowButtons
    );

    clientDateСreation.append(dateCreate, timeCreate);
    clientDateСhange.append(dateChange, timeChange);
    rowButtons.append(buttonContainer);
    buttonContainer.append(buttonChangeContainer, buttonDeleteContainer);
    buttonChangeContainer.append(buttonChangeIcon, buttonChange);
    buttonDeleteContainer.append(buttonDeleteIcon, buttonDelete);

    return {
      row,
      buttonChange,
      buttonDelete,
      clientId,
    };
  }

  function tableAdd(clientsList, clientForm, tableContainer) {
    let clientsListSort = arrSort(clientsList, prop, dir);

    tableContainer.innerHTML = "";
    tableLoader.classList.remove("container-loader--visible");

    clientsListSort.forEach(function (client) {
      let tableRow = createTableRow(client);
      let clientRow = tableRow.row;

      tableContainer.append(clientRow);

      tableButtonAction(
        tableRow.buttonChange,
        tableRow.buttonDelete,
        tableClients.tableButtonMain,
        client,
        clientForm
      );
    });

    formVisible();
  }

  async function tableHeadSort(clientForm, tableContainer) {
    const clientsList = await getClientsData();

    let tableHead = tableClients.tableHead;

    tableHead.querySelectorAll("th").forEach(function (headColumn) {
      headColumn.addEventListener("click", async function () {
        prop = this.dataset.value;
        dir = !dir;

        let svg = tableHead.querySelector(
          `[data-target="${this.dataset.value}"]`
        );

        if (!svg.classList.contains("table-head__item-svg--rotate")) {
          tableHead.querySelectorAll("svg").forEach(function (svg) {
            svg.classList.remove("table-head__item-svg--rotate");
          });
          svg.classList.add("table-head__item-svg--rotate");
        } else {
          tableHead.querySelectorAll("svg").forEach(function (svg) {
            svg.classList.remove("table-head__item-svg--rotate");
          });
        }

        tableContainer.innerHTML = "";
        tableLoader.classList.add("container-loader--visible");

        setTimeout(() => {
          tableLoader.classList.remove("container-loader--visible");
          tableAdd(clientsList, clientForm, tableContainer);
        }, 1000);
      });
    });
  }

  function tableButtonAction(
    buttonChange,
    buttonDelete,
    buttonMain,
    client,
    clientForm
  ) {
    buttonMain.addEventListener("click", function () {
      modal.classList.remove("form-delete");
      clientForm.formHeader.classList.remove("form-delete-header");
      clientForm.formClientId.style.display = "block";
      clientForm.formInputGroup.style.display = "flex";
      clientForm.formContactGroup.style.display = "flex";
      clientForm.formContainerTextDelete.style.display = "none";
      clientForm.contactButton.style.display = "flex";

      clientForm.formCaption.textContent = "Добавить клиента";
      clientForm.formClientId.textContent = "";
      clientForm.inputSurname.value = "";
      clientForm.inputName.value = "";
      clientForm.inputlastName.value = "";
      clientForm.contactContainer.innerHTML = "";
      clientForm.formContainerError.innerHTML = "";
      clientForm.buttonClientAdd.textContent = "Сохранить";
      clientForm.buttonCancelAdd.textContent = "Отмена";

      formInputLabelVisible();
    });

    buttonChange.addEventListener("click", function () {
      modal.classList.remove("form-delete");
      clientForm.formHeader.classList.remove("form-delete-header");
      clientForm.formClientId.style.display = "block";
      clientForm.formInputGroup.style.display = "flex";
      clientForm.formContactGroup.style.display = "flex";
      clientForm.formContainerTextDelete.style.display = "none";
      clientForm.contactButton.style.display = "flex";

      clientForm.formCaption.textContent = "Изменить клиента";
      clientForm.formClientId.textContent = client.id;
      clientForm.inputSurname.value = client.surname;
      clientForm.inputName.value = client.name;
      clientForm.inputlastName.value = client.lastName;
      clientForm.contactContainer.innerHTML = "";
      clientForm.formContainerError.innerHTML = "";
      clientForm.buttonClientAdd.textContent = "Сохранить";
      clientForm.buttonCancelAdd.textContent = "Удалить клиента";

      for (let contact of client.contacts) {
        let contactItem = createContactItem();
        let contactSelect = contactItem.contactSelect;
        let contactInput = contactItem.contactInput;
        contactSelect.value = contact.type;
        contactInput.value = contact.value;
        clientForm.contactContainer.append(contactItem.contact);
      }

      formInputLabelVisible();
    });

    buttonDelete.addEventListener("click", async function () {
      modal.classList.add("form-delete");
      clientForm.formHeader.classList.add("form-delete-header");
      clientForm.formCaption.textContent = "Удалить клиента";
      clientForm.formClientId.textContent = client.id;
      clientForm.formClientId.style.display = "none";
      clientForm.buttonClientAdd.textContent = "Удалить";
      clientForm.buttonCancelAdd.textContent = "Отмена";
      clientForm.formContainerTextDelete.style.display = "flex";
      clientForm.formInputGroup.style.display = "none";
      clientForm.formContactGroup.style.display = "none";
    });
  }

  // создание и действия формы

  function createForm() {
    const containerForm = createElem("div");
    const form = createElem("form");
    const formHeader = createElem("div");
    const formHeaderTitleContainer = createElem("div");
    const formCaption = createElem("h2");
    const formClientId = createElem("div");
    const formHeaderBtnClose = createElem("div");
    const formContainerTextDelete = createElem("div");
    const formInputGroup = createElem("div");
    const inputSurnameLabel = createElem("label");
    const inputSurname = createElem("input");
    const inputNameLabel = createElem("label");
    const inputName = createElem("input");
    const inputlastNameLabel = createElem("label");
    const inputlastName = createElem("input");
    const formContactGroup = createElem("div");
    const contactContainer = createElem("div");
    const formContainerError = createElem("div");
    const contactButton = createElem("div");
    const formButtonGroup = createElem("div");
    const buttonClientAdd = createElem("button");
    const buttonCancelAdd = createElem("div");

    containerForm.classList.add("form-container");
    form.classList.add("form");
    formHeader.classList.add("form-header");
    formHeaderTitleContainer.classList.add("form-title-container");
    formCaption.classList.add("title-reset", "form-title");
    formClientId.classList.add("form-client-id");
    formHeaderBtnClose.classList.add("form-btn--close");
    formContainerTextDelete.classList.add("form-delete-text");
    formInputGroup.classList.add("form-input-group");
    inputSurnameLabel.classList.add("form-input__label");
    inputSurname.classList.add("form-input");
    inputNameLabel.classList.add("form-input__label");
    inputName.classList.add("form-input");
    inputlastNameLabel.classList.add("form-input__label");
    inputlastName.classList.add("form-input");
    formContainerError.classList.add("form-container-error");
    formContactGroup.classList.add("form-contact-group");
    contactContainer.classList.add("form-contact-container");
    contactButton.classList.add("form-contact-btn");
    formButtonGroup.classList.add("form-btn-group");
    buttonClientAdd.classList.add("btn-reset", "form-btn--save");
    buttonCancelAdd.classList.add("btn-reset", "form-btn--delete");

    formCaption.textContent = "Новый клиент";

    formContainerTextDelete.textContent =
      "Вы действительно хотите удалить клиента?";

    inputSurnameLabel.textContent = "Фамилия";
    inputSurnameLabel.setAttribute("for", "surname");
    inputSurname.placeholder = "Фамилия*";
    inputSurname.id = "surname";
    inputSurname.setAttribute("autocomplete", "off");

    inputNameLabel.textContent = "Имя";
    inputNameLabel.setAttribute("for", "name");
    inputName.placeholder = "Имя*";
    inputName.id = "name";
    inputName.setAttribute("autocomplete", "off");

    inputlastNameLabel.textContent = "Отчество";
    inputlastNameLabel.setAttribute("for", "lastname");
    inputlastName.placeholder = "Отчество";
    inputlastName.id = "lastname";
    inputlastName.setAttribute("autocomplete", "off");

    contactButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_224_3502)">
    <path d="M7.99998 4.66671C7.63331 4.66671 7.33331 4.96671 7.33331 5.33337V7.33337H5.33331C4.96665 7.33337 4.66665 7.63337 4.66665 8.00004C4.66665 8.36671 4.96665 8.66671 5.33331 8.66671H7.33331V10.6667C7.33331 11.0334 7.63331 11.3334 7.99998 11.3334C8.36665 11.3334 8.66665 11.0334 8.66665 10.6667V8.66671H10.6666C11.0333 8.66671 11.3333 8.36671 11.3333 8.00004C11.3333 7.63337 11.0333 7.33337 10.6666 7.33337H8.66665V5.33337C8.66665 4.96671 8.36665 4.66671 7.99998 4.66671ZM7.99998 1.33337C4.31998 1.33337 1.33331 4.32004 1.33331 8.00004C1.33331 11.68 4.31998 14.6667 7.99998 14.6667C11.68 14.6667 14.6666 11.68 14.6666 8.00004C14.6666 4.32004 11.68 1.33337 7.99998 1.33337ZM7.99998 13.3334C5.05998 13.3334 2.66665 10.94 2.66665 8.00004C2.66665 5.06004 5.05998 2.66671 7.99998 2.66671C10.94 2.66671 13.3333 5.06004 13.3333 8.00004C13.3333 10.94 10.94 13.3334 7.99998 13.3334Z" fill="#9873FF"/>
    </g>
    <defs>
    <clipPath id="clip0_224_3502">
    <rect width="16" height="16" fill="white"/>
    </clipPath>
    </defs>
    </svg> Добавить контакт`;

    formHeaderBtnClose.innerHTML = `<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Frame 339">
    <path id="Union" fill-rule="evenodd" clip-rule="evenodd" d="M22.2333 7.73333L21.2666 6.76666L14.4999 13.5334L7.73324 6.7667L6.76658 7.73336L13.5332 14.5L6.7666 21.2667L7.73327 22.2333L14.4999 15.4667L21.2666 22.2334L22.2332 21.2667L15.4666 14.5L22.2333 7.73333Z" fill="#B0B0B0"/>
    </g>
    </svg>`;

    containerForm.append(form);
    form.append(
      formHeader,
      formContainerTextDelete,
      formInputGroup,
      formContactGroup,
      formContainerError,
      formButtonGroup
    );
    formHeader.append(formHeaderTitleContainer, formHeaderBtnClose);
    formHeaderTitleContainer.append(formCaption, formClientId);
    formInputGroup.append(
      inputSurnameLabel,
      inputSurname,
      inputNameLabel,
      inputName,
      inputlastNameLabel,
      inputlastName
    );
    formContactGroup.append(contactContainer, contactButton);
    formButtonGroup.append(buttonClientAdd, buttonCancelAdd);

    return {
      containerForm,
      form,
      formHeader,
      formCaption,
      formClientId,
      formHeaderBtnClose,
      formContainerTextDelete,
      formInputGroup,
      formContactGroup,
      inputSurname,
      inputName,
      inputlastName,
      contactButton,
      contactContainer,
      formContainerError,
      buttonClientAdd,
      buttonCancelAdd,
    };
  }

  function formVisible() {
    const btns = document.querySelectorAll(".btn");

    btns.forEach((el) => {
      el.addEventListener("click", (e) => {
        setTimeout(() => {
          modalOverlay.classList.add("modal-overlay--visible");
          modal.classList.add("modal--visible");
        }, 1000);
      });
    });

    modalOverlay.addEventListener("click", (e) => {
      if (e.target == modalOverlay) {
        modalOverlay.classList.remove("modal-overlay--visible");
        modal.classList.remove("modal--visible");
      }
    });

    clientForm.formHeaderBtnClose.addEventListener("click", function () {
      modalOverlay.classList.remove("modal-overlay--visible");
      modal.classList.remove("modal--visible");
    });

    formInputLabelVisible();
  }

  function formInputLabelVisible() {
    const clientFormInputs = clientForm.form.querySelectorAll(".form-input");

    clientFormInputs.forEach((input) => {
      let inputId = input.getAttribute("id");
      let label = document.querySelector(`[for='${inputId}']`);

      if (input.value === "") {
        label.classList.remove("form-input__label--visible");
      } else {
        label.classList.add("form-input__label--visible");
      }

      input.addEventListener("input", () => {
        label.classList.add("form-input__label--visible");

        if (input.value === "") {
          label.classList.remove("form-input__label--visible");
        }
      });
    });
  }

  async function formAction(clientForm) {
    clientForm.form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const client = {
        name: clientForm.inputName.value,
        surname: clientForm.inputSurname.value,
        lastName: clientForm.inputlastName.value,
        contacts: getContactItem(),
      };

      if (clientForm.formCaption.textContent === "Изменить клиента") {
        await responseData(
          `${SERVER_URL}/${clientForm.formClientId.textContent}`,
          "PATCH",
          client
        );
      } else if (clientForm.formCaption.textContent === "Добавить клиента") {
        await responseData(SERVER_URL, "POST", client);
      } else if (clientForm.formCaption.textContent === "Удалить клиента") {
        await responseData(
          `${SERVER_URL}/${clientForm.formClientId.textContent}`,
          "DELETE",
          client
        );
      }
    });

    clientForm.buttonCancelAdd.addEventListener("click", async function () {
      if (clientForm.buttonCancelAdd.textContent === "Отмена") {
        clientForm.inputSurname.value = "";
        clientForm.inputName.value = "";
        clientForm.inputlastName.value = "";
        clientForm.contactContainer.innerHTML = "";
        clientForm.formContainerError.innerHTML = "";
        formInputLabelVisible();
      } else if (clientForm.buttonCancelAdd.textContent === "Удалить клиента") {
        modal.classList.add("form-delete");
        clientForm.formHeader.classList.add("form-delete-header");
        clientForm.formCaption.textContent = "Удалить клиента";
        clientForm.formClientId.style.display = "none";
        clientForm.buttonClientAdd.textContent = "Удалить";
        clientForm.buttonCancelAdd.textContent = "Отмена";
        clientForm.formContainerTextDelete.style.display = "flex";
        clientForm.formInputGroup.style.display = "none";
        clientForm.formContactGroup.style.display = "none";
      }
    });

    clientForm.contactButton.addEventListener("click", function () {
      if (document.getElementsByClassName("contact-item").length === 9) {
        clientForm.contactContainer.append(createContactItem().contact);
        clientForm.contactButton.style.display = "none";
      }
      clientForm.contactContainer.append(createContactItem().contact);
    });
  }

  // создание контакта и получение данных контакта

  function createContactItem() {
    let contact = createElem("div");
    let contactSelect = createElem("select");
    let contactSelectOptionTel = createElem("option");
    let contactSelectOptionTel2 = createElem("option");
    let contactSelectOptionEmail = createElem("option");
    let contactSelectOptionVk = createElem("option");
    let contactInput = createElem("input");
    let buttonDeleteContact = createElem("div");

    contactSelectOptionTel.textContent = "Телефон";
    contactSelectOptionTel.value = "Телефон";
    contactSelectOptionTel2.textContent = "Доп. телефон";
    contactSelectOptionTel2.value = "Доп. телефон";
    contactSelectOptionEmail.textContent = "Email";
    contactSelectOptionEmail.value = "Email";
    contactSelectOptionVk.textContent = "Vk";
    contactSelectOptionVk.value = "Vk";

    contactInput.placeholder = "Введите данные контакта";

    contact.classList.add("contact-item");
    contactSelect.classList.add("contact-select");
    contactInput.classList.add("contact-input");
    buttonDeleteContact.classList.add("btn-reset", "btn-contact-delete");
    buttonDeleteContact.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_121_1083)">
    <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/>
    </g>
    <defs>
    <clipPath id="clip0_121_1083">
    <rect width="16" height="16" fill="white"/>
    </clipPath>
    </defs>
    </svg>`;

    buttonDeleteContact.addEventListener("click", function () {
      contact.remove();
    });

    contactInput.addEventListener("input", function () {
      if (
        contactSelect.value === "Телефон" ||
        contactSelect.value === "Доп телефон"
      ) {
        this.value = this.value.replaceAll(/[^0-9\.]/g, "");
      }

      if (contactSelect.value === "Email" || contactSelect.value === "Vk") {
        this.value = this.value.replaceAll(/[^a-zA-Z0-9.+@.+\.]/g, "");
      }
    });

    contactSelect.append(
      contactSelectOptionTel,
      contactSelectOptionTel2,
      contactSelectOptionEmail,
      contactSelectOptionVk
    );

    contact.append(contactSelect, contactInput, buttonDeleteContact);

    return {
      contact,
      contactSelect,
      contactInput,
    };
  }

  function getContactItem() {
    let contactContainer = document.querySelectorAll(".contact-item");
    let contactSelectValue = document.querySelectorAll(".contact-select");
    let contactInputValue = document.querySelectorAll(".contact-input");
    let contacts = [];

    for (let i = 0; i < contactContainer.length; i++) {
      contacts[i] = {
        type: contactSelectValue[i].value,
        value: contactInputValue[i].value,
      };
    }

    return contacts;
  }

  // фильтрация массива

  async function arrFilter(arr, prop, value) {
    let arrFilter = [];
    for (let item of arr) {
      if (String(item[prop]).includes(value) == true) arrFilter.push(item);
    }

    return arrFilter;
  }

  // сортировка массива

  function arrSort(arr, prop, dir) {
    arr.sort((a, b) =>
      (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 0
    );

    return arr;
  }

  // поиск клиента

  async function clientSearch(tableContainer, clientForm) {
    const clientsList = await getClientsData();

    let searchInput = document.getElementById("header-input");
    let timerFilter = null;

    searchInput.addEventListener("input", function () {
      let clientsListFilter = [...clientsList];
      let searchValue = this.value;

      if (timerFilter !== null) {
        clearTimeout(timerFilter);
      }

      tableContainer.innerHTML = "";
      tableLoader.classList.add("container-loader--visible");

      timerFilter = setTimeout(async function () {
        for (let client of clientsListFilter) {
          client.searchprop =
            client.surname +
            " " +
            client.name +
            " " +
            client.lastName +
            " " +
            client.id;
        }

        clientsListFilter = await arrFilter(
          clientsListFilter,
          "searchprop",
          searchValue
        );

        if (clientsListFilter.length === 0) {
          alert("Клиент не найден");
          clientsListFilter = [];
          searchInput.value = "";
          tableLoader.classList.remove("container-loader--visible");
          tableAdd(clientsList, clientForm, tableContainer);
        } else {
          tableLoader.classList.remove("container-loader--visible");
          tableAdd(clientsListFilter, clientForm, tableContainer);
        }
      }, 300);
    });
  }

  formAction(clientForm);
  tableHeadSort(clientForm, tableBody);
  clientSearch(tableBody, clientForm);
  setTimeout(() => {
    tableAdd(clientsList, clientForm, tableBody);
  }, 1000);
})();
