<template>
  <div id="canvas">
    <div
      class="canvas"
      :style="`transform: rotate(-${targetAngle}deg);transition-duration: ${transitionDuration}s;`"
    ></div>

    <img src="https://wx.xhsx88.com/vue-static/images/button_circle@3x.png" alt @click="_go" />
  </div>
</template>



<script>
export default {
  name: "HelloWorld",

  props: {
    msg: String
  },

  data() {
    return {
      targetAngle: 0, //角度

      transitionDuration: 8, //过渡时间

      list: [1, 2, 3, 4, 5, 6],

      deg: 0, //每个数据的角度

      time: 0, //节流

      checkDeg: 0 //选中的角度
    };
  },

  mounted() {
    //获取每个奖品的角度度数

    this.deg = 360 / this.list.length;
  },

  methods: {
    _go() {
      let data = Date.now(),
        random = parseInt(Math.ceil(Math.random() * this.list.length), 10);

      if (data - this.time > 5000) {
        if (this.targetAngle === 0) {
          // 第一次运行

          this.targetAngle = 1800 + (random * this.deg - this.deg / 2);
        } else {
          if (random - this.checkDeg < 0) {
            this.targetAngle =
              1800 + (this.targetAngle - (this.checkDeg - random) * this.deg);
          } else if (random - this.checkDeg > 0) {
            this.targetAngle =
              1800 + (this.targetAngle + (random - this.checkDeg) * this.deg);
          } else {
            this.targetAngle = 1800 + this.targetAngle;
          }
        }

        this.time = data;

        this.checkDeg = random;
      }
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->

<style  scoped>
.canvas,
#canvas {
  position: relative;

  width: 360px;

  height: 360px;

  border-radius: 360px;

  background: url(https://images.xhsx88.com/Uploads/image/default/2019-06/20190618161305_86401.png)
    no-repeat;

  background-size: 100% 100%;

  margin: 0 auto;
}
img {
  position: absolute;

  width: 15%;

  left: 50%;

  top: 50%;

  margin: -15% 0 0 -7.5%;
}
</style>