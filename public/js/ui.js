(function(){
 'use strict';
  class Ui {
    constructor () {
      this.form = document.forms.todo
      this.inputs = document.querySelectorAll('.input')
      this.deleteButton = document.querySelectorAll('.action-btn')
      this.checkInput = document.querySelectorAll('.check-input')
    }

    static updateDOMList() {
      const list = Activity.getAllActivities()
      if (!list.length || (list === null || undefined)) {
        console.log('No list to display')
        return
      }
      const frag = new DocumentFragment()
      const newBody = document.createElement('tbody')
     const str = list.map(item => `<tr class="listElem"><td>
     <input type="checkbox" data-id="${item.id}" ${item.completed ? 'checked' : ''} class="check-input"></td>
       <td class="description">${item.name}</td>
     <td class="date">${item.dueTime}</td>
     <td title="delete" class="action-btn" data-action="delete" data-id="${item.id}">&times;</td></tr>`).join(' ')
      newBody.innerHTML = str
      frag.appendChild(newBody)
      document.querySelector('.table-view').appendChild(frag)
      this.toggleCompleted()
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
      document.querySelector('.table-view tbody').insertAdjacentElement('afterbegin',tr)
    }

    // Toggling completed status
    static toggleCompleted() {
      Array.from(document.querySelectorAll('.check-input')).forEach(input => {
        if (input.checked) {
          input.closest('tr').classList.add('completed')
        } else {
          if (input.closest('tr').classList.contains('completed')) {
            input.closest('tr').classList.remove('completed')
          }
        }
      })
    }
  }

  // Updates DOM (on initial render) with items if any
  Ui.updateDOMList()

  const ui = new Ui()
  ui.form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!e.target.checkValidity()) {
      alert('Please all fields are required!')
      return
    }

  try {
    const item = new Activity(e.target.description.value, e.target.date.value)
    Activity.validateItem(item)
    Activity.addNewActivity(item)
    ui.addToDom(item)
  } catch (err) {
    console.log(err.name, err.message)
    alert(err.message)
  }

}, false);

// Deleting an activity
Array.from(ui.deleteButton).forEach(btn => {
  btn.addEventListener('click', async (e) => {
    try {
      const id = parseInt(e.target.dataset.id)
      const del = await Activity.removeActivityById(id)
      Activity.saveAllActivities(del)
      console.log(e.target.closest('tr'))
      e.target.closest('tr').remove()
    } catch (err) {
      alert(err.message)
    }
  })
})

  // Marking activity as completed
  Array.from(ui.checkInput).forEach(input => {
    input.addEventListener('change', (e) => {
      try {
        const id = parseInt(e.target.dataset.id)
        const toggleState = Activity.toggleCompleted(id)
        Activity.saveAllActivities(toggleState)
        Ui.toggleCompleted()
      } catch (err) {
        alert(err.message)
      }
    })
  })
})()