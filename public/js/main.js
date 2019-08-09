console.log('Todo application');
addToPage();
var
  form = document.forms.todo;
form.addEventListener('submit', saveTodo, false);

// add listener to the delete button
window.addEventListener('click', (e) => {
  if (e.target.dataset.action !== 'delete') return;
  var id = e.target.dataset.id;

  var parentElem = e.target.closest('li');
  parentElem.remove();
  deleteItem(id);
}, false);


function saveTodo(e) {
  e.preventDefault();
  var
    name = document.getElementById('name').value,
    date = document.getElementById('date').value,
    id = Date.now();

  if (!name || !date) return;

  var todos = getTodo();

  var todo = {
    name,
    date,
    id,
    done: false
  }

  if (todos == null) {
    todos = [];
  }

  // filter items with duplicate name
  var filtered = todos.filter((item) => item.name == todo.name);
  if (filtered.length == 0) {
    todos.push(todo);
    saveToStore(todos);
    addToPage();
  }
  form.reset();
}

// get todo from the storage
function getTodo() {
  try {
    var todoItem = localStorage.getItem('todo');
    return JSON.parse(todoItem);
  } catch (e) {
    return [];
  }
}

// save item to the storage
function saveToStore(todos) {
  localStorage.setItem('todo', JSON.stringify(todos));
}

// add items to page
function addToPage() {
  var todoItems = getTodo();
  if (todoItems == null) return;

  var listBox = document.querySelector('.itemList');
  if (listBox) listBox.innerHTML = '';

  listBox.innerHTML = todoItems.map(list => {
    return `<li class="listElem">
  <input type="checkbox" data-id="${list.id}" class="status" ${list.done ? 'checked' : ''}>
  <span>${list.name}</span>
  <span class="date">(${list.date})</span>
  <span title="delete" class="action-btn" data-action="delete" data-id="${list.id}">&times;</span></li>`
  }).join('');
}

// delete an item
function deleteItem(itemId) {
  var items = getTodo();
  var filtered = items.filter((item) => item.id !== Number(itemId));
  saveToStore(filtered);
  addToPage();
}

var el = document.querySelectorAll('.listElem');
[].forEach.call(el, (elem) => {
  elem.addEventListener('click', toggleStatus, false);
});

// toggle item status
function toggleStatus(e) {
  if (!e.target.matches('input')) return;
  var id = e.target.dataset.id;

  var items = getTodo();
  for (var x = 0, max = items.length; x < max; x++) {
    if (items[x].id == Number(id)) {
      items[x].done = !items[x].done;
      console.log(items[x]);
      saveToStore(items);
      addToPage();
    }
  }
}