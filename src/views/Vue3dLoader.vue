<template>
  <div>
    <div id="app">
      <particle class="canvas"></particle>
      <!-- Intro -->
      <div class="intro position-fixed" style="padding: 48px">
        <img src="../assets/images/logo.png" alt="logo" />
        <div id="intro-data">
          <h1 class="mt-5 mb-3 text-white">Go Beyond the Unimaginable</h1>
          <h2 class="text-white">
            Stay tuned to explore the future of reality
          </h2>
        </div>
      </div>
      <div id="intro-data">
        <button class="demo-button get-ready-button" @click="flyClicked = true">
          Get ready to fly
        </button>
        <button
          class="demo-button fly-button"
          style="opacity: 0; margin-top: 60px"
          @click="flyIntoSpace = true"
        >
          Fly Into space
        </button>
      </div>
      <!-- END -->

      <div v-if="!buttonClicked">
        <vue3dLoader
          id="first-model"
          :height="screenHeight"
          :width="screenWidth"
          :filePath="['/models/Cañonero Coleriano MK II.obj']"
          :mtlPath="['/models/Cañonero Coleriano MK II.mtl']"
          :position="position"
          :rotation="rotation"
          :controlsOptions="{
            enablePan: false,
            enableZoom: false,
            enableRotate: false,
          }"
          :backgroundAlpha="0"
          :autoPlay="false"
          @load="rotate()"
        ></vue3dLoader>
      </div>
      <div v-else>
        <model></model>
      </div>
    </div>
  </div>
</template>

<script>
import { vue3dLoader } from "vue-3d-loader";
import particle from "../components/particle.vue";
import model from "../components/model.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "App",
  components: {
    particle,
    vue3dLoader,
    model,
    // cube,
  },
  data() {
    return {
      buttonClicked: false,
      flyClicked: false,
      flyIntoSpace: false,
      flyModel: false,
      screenWidth: null,
      screenHeight: null,
      rotation: [{ x: Math.PI / 36, y: 0, z: 0 }],
      position: [{ x: 30, y: 0, z: -20 }],
      gsapControl: null,
    };
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    window.addEventListener("resize", () => {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    });
    this.gsapControl = gsap.timeline();
  },
  methods: {
    fadeItems(opacity, id) {
      const tl = gsap
        .timeline({
          paused: true,
          defaults: { duration: 1 },
        })
        .to(id, { opacity: opacity });

      tl.restart();
    },
    rotate() {
      let stopRotation = false;
      if (!stopRotation) {
        if (!this.flyClicked) {
          this.rotation[0].y += 0.005;
        } else if (this.rotation[0].y % 3.14 > 0.1) {
          this.fadeItems(0, ".get-ready-button");
          this.rotation[0].y += 0.05;
        } else {
          stopRotation = true;
        }
      }

      if (stopRotation) {
        if (this.rotation[0].x >= -Math.PI / 2 && this.position[0].y >= -10) {
          this.rotation[0].x -= Math.PI / 200;
          this.position[0].y -= 0.1;
        } else {
          this.fadeItems(1, ".fly-button");
        }
      }

      if (stopRotation && this.flyIntoSpace && this.position[0].z > -220) {
        this.position[0].x -= 0.3;
        this.position[0].y -= 0.1;
        this.position[0].z -= 1;
        this.rotation[0].z -= 0.0025;
        if (this.position[0].z == -50) this.fadeItems(0, "#first-model");
      } else if (!this.buttonClicked && this.flyIntoSpace) {
        this.buttonClicked = true;
        this.fadeItems(0, "#intro-data");
      }

      requestAnimationFrame(this.rotate);
    },
  },
};
</script>
<style lang="scss" scoped>
.demo-class {
  height: 100vh;
}
.demo-button {
  position: fixed;
  top: 350px;
}
// .demo-button {
//   position: fixed;
//   top: 400px;
// }
#first-model {
  z-index: 1;
}
button {
  margin-left: 48px;
  position: fixed;
  z-index: 2;
  background-image: url("../assets/images/button.png");
  background-size: cover;
  display: block;
  font-size: 24px;
  font-family: sans-serif;
  text-decoration: none;
  color: #333;
  padding: 10px;
  letter-spacing: 2px;
  transition: all 0.25s;
}

button:hover {
  letter-spacing: 15px;
}
</style>
