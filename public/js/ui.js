'use strict';
const UI = (function (Activity) {

  const init = () => {
    const form = document.querySelector('#todo')
    const deleteButton = document.querySelectorAll('.action-btn')
    const checkInput = document.querySelectorAll('.check-input')

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (!e.target.checkValidity()) {
        alert('Please all fields are required!')
        return
      }
      try {
        const item = Activity.save(e.target.description.value, e.target.date.value)
        UI.addToDOM(item)
      } catch (err) {
        console.log(err.name, err.message)
        alert(err.message)
      }
    })

    // Deleting an activity
    Array.from(deleteButton).forEach(btn => {
      btn.addEventListener('click', (e) => {
        try {
          const id = parseInt(e.target.dataset.id)
          Activity.remove(id)
          e.target.closest('tr').remove()
        } catch (err) {
          alert(err.message)
        }
      })
    })

    // Marking activity as completed
    Array.from(checkInput).forEach(input => {
      input.addEventListener('change', (e) => {
        try {
          const id = parseInt(e.target.dataset.id)
          Activity.toggle(id)
        } catch (err) {
          alert(err.message)
        }
      })
    })
  }

     const updateDOMList = () => {
       const list = Activity.get()
       console.log(list)
      if (!list.length) {
        console.log('No list to display')
        return
      }
      const frag = new DocumentFragment()
      const newBody = document.createElement('tbody')
     const str = list.map(item => `<tr class="listElem"><td>
     <input type="checkbox" data-id="${item.id}" ${item.completed ? 'checked' : ''} class="check-input"></td>
       <td class="description">${item.description}</td>
     <td class="date">${item.due_time}</td>
     <td title="delete" class="action-btn" data-action="delete" data-id="${item.id}">&times;</td></tr>`).join(' ')
      newBody.innerHTML = str
      frag.appendChild(newBody)
      document.querySelector('.table-view').appendChild(frag)
      cancellOutCompleted()
    }

    const addToDOM = (item) => {
      const tr = document.createElement('tr')
      tr.classList.add('listElem')
      const str = `<td>
      <input type="checkbox" data-id="${item.id}" ${item.completed ? 'checked' : ''} class="check-input"></td>
        <td class="description">${item.description}</td>
      <td class="date">${item.due_time}</td>
      <td title="delete" class="action-btn" data-action="delete" data-id="${item.id}">&times;</td>`
      tr.innerHTML = str
      document.querySelector('.table-view tbody').insertAdjacentElement('afterbegin',tr)
  }

  const cancellOutCompleted = () => {
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

  return {
    updateDOMList,
    addToDOM,
    strike: cancellOutCompleted,
    init
  }
})(Activity)

UI.updateDOMList()
UI.init()