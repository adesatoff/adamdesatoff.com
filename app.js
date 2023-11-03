const app = Vue.createApp({
  data() {
    return {
      name: "Adam Desatoff",
      typedName: "",
      job: "Computer Science Student",
      typedJob: "",
      blink: false,
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
  },
  created() {
    setTimeout(() => {
      this.typeName();
    }, 500);
    setTimeout(() => {
      this.typeJob();
    }, 2250);
  },
});

app.mount("#app");
