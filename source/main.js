/*
    @ main.js
        # Reference
            + Using the Fetch API : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
*/

// Global fetch() method
async function getItems() {
  const response = await fetch('data/data.json');
  const json = await response.json();

  return json.items;
}

function createElement(item) {
  const img = document.createElement('img');
  img.setAttribute('class', 'thumbnail');
  img.setAttribute('src', item.image);

  const span = document.createElement('span');
  span.setAttribute('class', 'description');
  span.innerText = `${item.gender}, ${item.size} size`;

  const li = document.createElement('li');
  li.setAttribute('class', 'item');
  li.setAttribute('data-type', item.type);
  li.setAttribute('data-color', item.color);
  li.append(img);
  li.append(span);

  return li;
}

function filterItems(items, key, value) {
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

function onButtonClick(event, items) {
  const eventData = event.target.dataset;
  const key = eventData.key;
  const value = eventData.value;

  if (key == null || value == null) {
    return;
  }

  filterItems(items, key, value);
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => loadPage());

  const buttons = document.querySelector('.buttons');
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

function createPage(items) {
  const elements = items.map(createElement);

  const itemsContainer = document.querySelector('.items');
  itemsContainer.append(...elements);

  const buttons = document.querySelector('.buttons');
  buttons.addEventListener('click', (event) => onButtonClick(event, elements));
}

function loadPage() {
  const itemsContainer = document.querySelector('.items');
  itemsContainer.textContent = '';

  getItems().then((items) => {
    createPage(items);
  });
}

loadPage();
setEventListeners();
