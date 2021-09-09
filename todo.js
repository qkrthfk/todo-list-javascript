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
  updateState();
  input.value = '';
  input.focus();
}

// Create Item
function createItem(value) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item">
      <input type="checkbox" class="item__checkbox" id="checkbox${id}"/>
      <label for="checkbox${id}" class="item__name">${value}</label>
      <button class="item__delete">
        <i class="fas fa-trash-alt" data-id="${id}"></i>
      </button>
    </div>
    <div class="item__divider"></div>
  `;

  id += 1;
  return itemRow;
}

// item event
items.addEventListener('click', event => {
  
  // delete item
  const id = event.target.dataset.id;
  if (id) {
    const deletedTarget = document.querySelector(`.item__row[data-id="${id}"]`);
    deletedTarget.remove();
    
  }

  // toggle completed item
  const target = event.target.className;
  if (target.indexOf('item__checkbox') > -1) {
    event.target.labels[0].classList.toggle('completed');
  }

  updateState();
});

// count item
function updateState() {
  const item = items.children;
  let completedCnt = 0;
  let activeCnt = 0;

  for (let i = 0; i < item.length; i += 1) {
    const completed = item[i].querySelector('.completed');
    if (completed) {
      completedCnt += 1;
    } else {
      activeCnt += 1;
    }
  }

  document.querySelector('.summary__active').innerText = activeCnt;
  document.querySelector('.summary__completed').innerText = completedCnt;
}