Vue.createApp({
  data() {
    return {
      colorList: [],
      red: 0,
      green: 0,
      blue: 0,
      rgbStr: "rgb(0, 0, 0)",
    };
  },
  methods: {
    createColor: function () {
      this.rgbStr = `rgb(${this.red}, ${this.green}, ${this.blue})`;

      this.colorList.push(this.rgbStr);

      this.red = 0;
      this.green = 0;
      this.blue = 0;
    },
  },
}).mount("#app");
