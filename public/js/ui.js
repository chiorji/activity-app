(function () {
  // START CLASS
  class Ui {
    constructor () {
      this.form = document.forms.todo
      this.inputs = document.querySelectorAll('.input')
    }

    static updateDOMList() {
      const list = Activity.getAllActivities()
      if (!list.length || (list === null || undefined)) {
        console.log('No list to display')
        return
      }
      const compare = ((a,b) => b.id - a.id)
      const listSorted = list.sort(compare)
      const frag = new DocumentFragment()
      const newBody = document.createElement('tbody')
     const str = listSorted.map(item => `<tr class="listElem"><td>
     <input type="checkbox" data-id="${item.id}" ${item.completed ? 'checked' : ''} class="check-input"></td>
       <td class="description">${item.name}</td>
     <td class="date">${item.dueTime}</td>
     <td title="delete" class="action-btn" data-action="delete" data-id="${item.id}">&times;</td></tr>`).join(' ')
      newBody.innerHTML = str
      frag.appendChild(newBody)
      document.querySelector('.table-view').appendChild(frag)
    }

    addToDom(item) {
      const tr = document.createElement('tr')
      tr.classList.add('listElem')
      const str = `<td>
      <input type="checkbox" data-id="${item.id}" ${item.completed ? 'checked' : ''} class="check-input"></td>
        <td class="description">${item.name}</td>
      <td class="date">${item.dueTime}</td>
      <td title="delete" class="action-btn" data-action="delete" data-id="${item.id}">&times;</td>`
      tr.innerHTML = str
      document.querySelector('.table-view tbody').appendChild(tr)
    }
  }
  // END CLASS

  const ui = new Ui()
  ui.form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!e.target.checkValidity()) {
      alert('Please all fields are required!')
      return
    }

  try {
    const item = new Activity(e.target.description.value, e.target.date.value)
    console.log(item)
    Activity.validateItem(item)
    Activity.addNewActivity(item)
    ui.addToDom(item)
  } catch (err) {
    console.log(err.name, err.message)
    alert(err.message)
  }

  }, false);

  Ui.updateDOMList()
})()