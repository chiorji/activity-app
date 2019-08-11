console.log('My activity app');
var listBox = document.querySelector('.itemList');
moment();

if ('localStorage' in window) {
  updateDom();
  var
    form = document.forms.todo;
  form.addEventListener('submit', saveTodo, false);

  listBox.addEventListener('click', (e) => {
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

    var filtered = todos.filter((item) => item.name == todo.name);
    if (filtered.length == 0) {
      todos.push(todo);
      saveToStore(todos);
      updateDom();
    }
    form.reset();
  }


  function getTodo() {
    var todoItem = localStorage.getItem('todo');
    return JSON.parse(todoItem) || '';
  }

  function saveToStore(todos) {
    localStorage.setItem('todo', JSON.stringify(todos));
  }


  function updateDom() {
    var todoItems = getTodo();
    if (todoItems == null || !todoItems.length) return;

    if (listBox) listBox.innerHTML = '';

    listBox.innerHTML = todoItems.map(list => {
      return `<li class="listElem">
  <input type="checkbox" data-id="${list.id}" class="status" ${list.done ? 'checked' : ''}>
  <span>${list.name}</span>
  <span class="date">( ${moment.utc(list.date, 'YYYY-MM-DD').fromNow()} )</span>
  <span title="delete" class="action-btn" data-action="delete" data-id="${list.id}">&times;</span></li>`
    }).join('');
  }


  function deleteItem(itemId) {
    var items = getTodo();
    var filtered = items.filter((item) => item.id !== Number(itemId));
    saveToStore(filtered);
    updateDom();
  }

  var el = document.querySelectorAll('.listElem');
  [].forEach.call(el, (elem) => {
    elem.addEventListener('click', toggleStatus, false);
  });


  function toggleStatus(e) {
    if (!e.target.matches('input')) return;
    var id = e.target.dataset.id;

    var items = getTodo();
    for (var x = 0, max = items.length; x < max; x++) {
      if (items[x].id == Number(id)) {
        items[x].done = !items[x].done;
        console.log(items[x]);
        saveToStore(items);
        updateDom();
      }
    }
  }
} else {
  alert('Please!! Local storage is needed for an effective use of the app!')
}