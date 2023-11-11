Vue.createApp({
  data() {
    return {
      galleryNum: 1,
      name: "const Adam_Desatoff =",
      typedName: "",
      job: "Computer.Science(Student);",
      typedJob: "",
      blink: false,
      numInput: 0,
      dice: [],
      colorList: [],
      red: null,
      green: null,
      blue: null,
      rgbStr: "rgb(null, null, null)",
      message: "",
      options: [
        "Yes.",
        "No.",
        "Ask Again Later.",
        "Most Likely.",
        "Don't Get Your Hopes Up.",
        "Only Time Will Tell.",
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
    galleryForward() {
      this.galleryNum++;
      if (this.galleryNum > 8) {
        this.galleryNum = 1;
      }
    },
    galleryBack() {
      this.galleryNum--;
      if (this.galleryNum < 1) {
        this.galleryNum = 8;
      }
    },
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
    // Dice Roller
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
    // Color Creator
    createColor: function () {
      this.rgbStr = `rgb(${this.red}, ${this.green}, ${this.blue})`;

      this.colorList.push(this.rgbStr);

      this.red = null;
      this.green = null;
      this.blue = null;
    },
    // Magic 8 ball
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
    // To-Do List
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
    // Unit Converter
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
    // Whack-A-Mole
    moveMole: function () {
      this.resetMole();
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
    resetMole: function () {
      this.score = 0;
      this.total = 0;
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
    }, 350);
    setTimeout(() => {
      this.typeJob();
    }, 2350);
  },
  watch: {
    search(newSearch, oldSearch) {
      this.filteredTasks = this.tasks.filter((task) => {
        return task.description.toLowerCase().includes(newSearch.toLowerCase());
      });
    },
  },
}).mount("#app");
