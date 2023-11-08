Vue.createApp({
  data() {
    return {
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
    };
  },
  methods: {
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
  },
  created: function () {},
}).mount("#app");
