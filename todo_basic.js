const items = document.querySelector('.items');
const input = document.querySelector('.content__input');
const addBtn = document.querySelector('.content__button');
let id = 0; // UUID

addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    onAdd();
  }
});

// Add Item
function onAdd() {
  const value = input.value;
  if (value === '') {
    input.focus();
    return;
  }

  const item = createItem(value);
  items.appendChild(item);
  item.scrollIntoView({ block: 'center' });
  input.value = '';
  input.focus();
}

// Create Item
function createItem(value) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const checkbox = document.createElement('input');
  checkbox.setAttribute('id', `checkbox${id}`);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('class', 'item__checkbox');

  const name = document.createElement('label');
  name.setAttribute('for', `checkbox${id}`);
  name.setAttribute('class', 'item__name');
  name.innerText = value;
  
  id += 1;

  // toggle completed item
  checkbox.addEventListener('click', () => {
    name.classList.toggle('completed');
  });

  // delete item
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'item__delete');
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.addEventListener('click', () => {
    itemRow.remove();
  });

  const itemDivider = document.createElement('div');
  itemDivider.setAttribute('class', 'item__divider');

  item.appendChild(checkbox);
  item.appendChild(name);
  item.appendChild(deleteBtn);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);

  return itemRow;
}

