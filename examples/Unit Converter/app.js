Vue.createApp({
  data() {
    return {
      left: null,
      right: null,
      answerLeft: null,
      answerRight: null,
    };
  },
  methods: {
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
  },
}).mount("#app");
