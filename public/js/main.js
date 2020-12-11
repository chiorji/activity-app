'use strict';
 class Activity {
    constructor (name, dueTime) {
      this.name = name
      this.dueTime = dueTime
      this.id = Date.now()
      this.completed = false
    }

    // Return all activities saved or an empty array of no activity
   static getAllActivities() {
    const compare = ((a,b) => b.id - a.id)
     let act = localStorage['act'] ? JSON.parse(localStorage['act']) : [];
     act.length > 0 ? act.sort(compare) : act
    return act
    }

    // Add new activity t activitiess list
    static addNewActivity(act) {
      const all = this.getAllActivities()
      all.push(act)
      this.saveAllActivities(all)
    }

    // Save all activities to localStorage
    static saveAllActivities(activities) {
      try {
          localStorage['act'] = JSON.stringify(activities)
      } catch (err) {
        throw new Error('Saving error')
      }
    }

    // Removing an activity by id
    static async removeActivityById(id) {
      if (typeof (id) !== "number") {
        throw new Error('Id must be a number')
      }
      const activities = await this.getAllActivities()
      if (!activities.length) {
        throw new Error('No activity to remove')
      }
      try {
        const act = activities.filter(item => parseInt(item.id) !== id)
        return act
      } catch (err) {
        throw new Error('Failed to delete activity with id: ' + id)
     }
    }

   static validateItem(item) {
      const regex = /^(\d{4}-\d{2}-\d{2})/
      if (!item.name || (typeof (item.name) !== 'string') || item.name === ('' || 'undefined')) {
        throw new Error('Name is required and must be a non empty string')
      }

      if (!item.dueTime || !regex.test(item.dueTime)) {
        throw new Error('Provide a valid date in the format "yyyy-dd-mm"')
      }
    }

  //  Mark an item as completed
    static toggleCompleted(id) {
      if (typeof (id) !== "number") {
        throw new Error('Item Id must be a number')
      }
      try {
        const items = this.getAllActivities()
        for (let x = 0, max = items.length; x < max; x++) {
          if (items[x].id === id) {
            items[x].completed = !items[x].completed;
            break;
          }
        }
        return items
        } catch (err) {
          throw new Error('Failed to toggle item state')
      }
    }
  }
