Vue.createApp({
  data() {
    return {
      numInput: 0,
      dice: [],
    };
  },
  methods: {
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
  },
}).mount("#app");
