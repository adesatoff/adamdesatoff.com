Vue.createApp({
  data() {
    return {
      tasks: [],
      search: "",
      filteredTasks: [],
      sortOrder: "",
      modalOpen: false,
      taskDesc: "",
      taskCat: "",
      modal: {
        index: -1,
        description: "",
        category: "",
      },
    };
  },
  methods: {
    addTask(taskDesc, taskCat) {
      let task = {
        description: taskDesc,
        category: taskCat,
      };
      taskDesc = "";
      taskCat = "";
      this.tasks.push(task);
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    clearSearch() {
      this.search = "";
    },
    sortTasks() {
      if (this.sortOrder === "asc") {
        this.tasks.sort((a, b) => {
          if (a.description > b.description) return -1;
          if (a.description < b.description) return 1;
          return 0;
        });
        this.sortOrder = "desc";
      } else {
        this.tasks.sort((a, b) => {
          if (a.description > b.description) return 1;
          if (a.description < b.description) return -1;
          return 0;
        });
        this.sortOrder = "asc";
      }
    },
    toggleModal(index = null) {
      this.modalOpen = !this.modalOpen;
      if (index !== null) {
        let task = this.tasks[index];
        this.modal.index = index;
        this.modal.description = task.description;
        this.modal.category = task.category;
      }
    },
    updateTask() {
      this.tasks[this.modal.index].description = this.modal.description;
      this.tasks[this.modal.index].category = this.modal.category;
    },
  },
  watch: {
    search(newSearch, oldSearch) {
      this.filteredTasks = this.tasks.filter((task) => {
        return task.description.toLowerCase().includes(newSearch.toLowerCase());
      });
    },
  },
}).mount("#app");
