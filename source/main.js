/*
    @ main.js
        # Reference
            + Using the Fetch API : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
*/

// Global fetch() method
function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const containerItems = document.querySelector('.items');
  containerItems.innerHTML = items
    .map((item) => createHTMLString(item))
    .join('');
}

function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
  `;
}

function onButtonClick(event, items) {
  const eventData = event.target.dataset;
  const key = eventData.key;
  const value = eventData.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
