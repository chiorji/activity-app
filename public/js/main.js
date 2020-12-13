'use strict';
const Activity = (function () {
  // Retrieve items from localStorage
  const allItems = localStorage['act'] ? JSON.parse(localStorage['act']) : []

  // Returning all list sorted by id
  const getAllActivities = () => {
    let items = [...allItems]
    const compare = ((a,b) => b.id - a.id)
    items = items.length > 0 ? items.sort(compare) : items
    return items
  }

  // Saving to localstorage
  const saveToStorage = (array) => {
    try {
      const items = [...array]
      localStorage['act'] = JSON.stringify(items)
    } catch (err) {
      throw new Error('Error saving activity')
    }
  }

  // Saving new item
  const saveItem = (description, due_time) => {
    const regex = /^(\d{4}-\d{2}-\d{2})/
    if (!(description || dueTime) || !(regex.test(due_time))) {
      throw new Error('Activity description and due time are both required')
    }
    const item = { description, due_time, id: Date.now(), completed: false }
    console.log('Added new item ---> ', item)
    const items = [...allItems]
    items.push(item)
    saveToStorage(items)
    return item
  }

  // Deleting an item
  const removeById = (id) => {
    let items = [...allItems]
    if (typeof (id) !== "number" || !items.length) {
      throw new Error('Validation process failed')
    }

    try {
      items = items.filter(item => parseInt(item.id) !== id)
      saveToStorage(items)
    } catch (err) {
      throw err
   }
  }

  // Changing completed status
  const toggleCompleted = (id) => {
    if (!id || typeof(id) !== "number") {
      throw new Error('Id must be a number')
    }

    const items = [...allItems]
    for (let x = 0, max = items.length; x < max; x++) {
      if (items[x].id === id) {
        items[x].completed = !items[x].completed;
        saveToStorage(items)
        break;
      }
    }
  }

  return {
    save: saveItem,
    get: getAllActivities,
    remove: removeById,
    toggle: toggleCompleted
  }
})()

console.log(Activity)