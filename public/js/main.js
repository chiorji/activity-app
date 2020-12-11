 class Activity {
    constructor (name, dueTime) {
      this.name = name
      this.dueTime = dueTime
      this.id = Date.now()
      this.completed = false
    }

    // Return all activities saved or an empty array of no activity
   static getAllActivities() {
     let act = localStorage['act'] ? JSON.parse(localStorage['act']) : [];
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
    static removeActivityById(id) {
      if (typeof (id) !== "number") {
        throw new Error('Id must be a number')
      }

      const activities = this.getAllActivities()
      if (!activities.length) {
        throw new Error('No activity to remove')
      }
      const act = activities.filter(item => item.id !== id)
      this.saveActivities(act)
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

    static markAsCompleted(id) {
      if (typeof (id) !== "number") {
        throw new Error({ msg: 'Id must be a number' })
      }

      const acts = this.getAllActivities()
      for (var x = 0, max = acts.length; x < max; x++) {
        if (acts[x].id === id) {
          acts[x].completed = !acts[x].completed;
          console.log(acts[x]);
          saveActivities(acts);
        }
      }
    }
  }
