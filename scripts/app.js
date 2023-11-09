const app = Vue.createApp({
  data() {
    return {
      name: "var Adam_Desatoff =",
      typedName: "",
      job: "Computer.Science(Student);",
      typedJob: "",
      blink: false,
      numInput: 0,
      dice: [],
      colorList: [],
      red: 0,
      green: 0,
      blue: 0,
      rgbStr: "rgb(0, 0, 0)",
      message: "",
      options: [
        "Yes.",
        "No.",
        "Ask Again Later.",
        "Most Likely.",
        "Don't Get Your Hopes Up.",
        "Joe Biden.",
      ],
      question: "",
      history: [],
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
      left: null,
      right: null,
      answerLeft: null,
      answerRight: null,
      rows: 5,
      columns: 5,
      moleRow: -1,
      moleCol: -1,
      total: 0,
      score: 0,
    };
  },
  methods: {
    typeName() {
      let i = 0;
      const nameLength = this.name.length;
      const typeInterval = 75;
      const typeTimer = setInterval(() => {
        if (i < nameLength) {
          this.typedName += this.name[i];
          i++;
        } else {
          clearInterval(typeTimer);
        }
      }, typeInterval);
    },
    typeJob() {
      let i = 0;
      const nameLength = this.job.length;
      const typeInterval = 60;
      const typeTimer = setInterval(() => {
        if (i < nameLength) {
          this.typedJob += this.job[i];
          i++;
        } else {
          clearInterval(typeTimer);
          setTimeout(() => {
            this.blink = true;
          }, 500);
        }
      }, typeInterval);
    },
    addDie: function () {
      if (this.numInput > 0) {
        this.dice.push({ sides: this.numInput, value: 1 });
      }
    },
    rollDie: function (index) {
      let currentDie = this.dice[index];
      let rollInterval = setInterval(() => {
        currentDie.value = Math.ceil(Math.random() * currentDie.sides);
      }, 25);
      setTimeout(() => {
        clearInterval(rollInterval);
      }, 500);
    },
    rollAllDice() {
      this.dice.forEach((die, index) => {
        this.rollDie(index);
      });
    },

    deleteDie: function (index) {
      this.dice.splice(index, 1);
    },
    createColor: function () {
      this.rgbStr = `rgb(${this.red}, ${this.green}, ${this.blue})`;

      this.colorList.push(this.rgbStr);

      this.red = 0;
      this.green = 0;
      this.blue = 0;
    },
    askQuestion: function () {
      let index = Math.floor(Math.random() * this.options.length);
      let message = this.options[index];
      this.message = message;

      this.history.push({
        question: this.question,
        answer: this.message,
      });
      console.log(history);
      this.question = "";
    },
    Valid: function () {
      return this.question[this.question.length - 1] == "?";
    },
    deleteItem: function (item) {
      console.log(item);
      var index = this.history.indexOf(item);
      this.history.splice(index, 1);
    },
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
    convertLeft: function () {
      if (this.isValidInput(this.left)) {
        let GBtoMB = this.left * 1000;
        this.answerLeft = GBtoMB;
      } else {
        this.answerLeft = null;
      }
    },
    convertRight: function () {
      if (this.isValidInput(this.right)) {
        let MBtoKB = this.right * 1024;
        this.answerRight = MBtoKB;
      } else {
        this.answerRight = null;
      }
    },
    isValidInput: function (input) {
      return input !== null && input !== "" && !isNaN(input);
    },
    moveMole: function () {
      var moleTime = setInterval(() => {
        this.moleRow = Math.ceil(Math.random() * this.rows);
        this.moleCol = Math.ceil(Math.random() * this.columns);
        this.total++;
        if (this.total >= 10) {
          setTimeout(() => {
            this.moleRow = -1;
            this.moleCol = -1;
          }, 1000);
          clearInterval(moleTime);
        }
      }, 1000);
    },
    hitMole: function () {
      this.score++;
      this.moleRow = -1;
      this.moleCol = -1;
    },
  },
  created() {
    setTimeout(() => {
      this.typeName();
    }, 500);
    setTimeout(() => {
      this.typeJob();
    }, 2250);
    this.moveMole();
  },
  watch: {
    search(newSearch, oldSearch) {
      this.filteredTasks = this.tasks.filter((task) => {
        return task.description.toLowerCase().includes(newSearch.toLowerCase());
      });
    },
  },
});

app.mount("#app");
