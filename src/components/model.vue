<template>
  <div>
    <div id="app">
      <vue3dLoader
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
    <h1 class="scroll-more-text text-white text-center">
      Scroll to learn more.
    </h1>
    <!-- <cube></cube> -->
    <div class="demo-class section1">
      <article style="left: 48px" id="step1-content">
        <h3>Title 1</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </article>
    </div>
    <div class="demo-class section2">
      <article style="right: 48px" id="step2-content">
        <h3>Title 2</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </article>
    </div>
    <div class="demo-class section3">
      <article style="left: 48px" id="step3-content">
        <h3>Title 3</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </article>
    </div>
    <div class="demo-class section4">
      <article style="right: 48px" id="step4-content">
        <h3>Title 4</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </article>
    </div>
    <div class="demo-class section5">
      <div id="step5-content">
        <a
          href="https://www.exio8.com/"
          target="_blank"
          class="register-button btn btn-lg"
        >
          Click here to register
        </a>
      </div>
    </div>

    <!-- final button -->

    <!--  -->
  </div>
</template>

<script>
import { vue3dLoader } from "vue-3d-loader";

import { gsap, TimelineLite } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "App",
  components: {
    vue3dLoader,
  },
  data() {
    return {
      modelEntered: false,
      screenWidth: null,
      screenHeight: null,
      rotation: [{ x: 0, y: 0, z: 0 }],
      position: [{ x: 0, y: -30, z: 10 }],
      gsapControl: null,
    };
  },
  watch: {
    modelEntered() {
      let tl = new TimelineLite({ paused: true });
      ScrollTrigger.defaults({
        // markers: true,
        // snap: {
        //   snapTo: 1,
        //   duration: { min: 0.2, max: 0.8 },
        //   delay: 0,
        //   ease: "power1.inOut",
        // },
        scrub: true,
      });
      gsap.to(this.rotation[0], {
        y: -2 * Math.PI,
        ease: "none",
        scrollTrigger: {
          trigger: ".section2",
          start: "top 100%",
          snap: 0,
          endTrigger: ".section5",
          end: "top top",
        },
      });

      tl.to(this.position[0], {
        y: -7,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".section2",
          start: "top bottom",
          end: "top top",
          onEnter: () => {
            this.fadeItems("#step1-content", 1);
            this.fadeItems(".scroll-more-text", 0);
          },
          onEnterBack: () => {
            this.fadeItems("#step1-content", 1);
          },
          onLeave: () => {
            this.fadeItems("#step1-content", 0);
          },
        },
      })
        .fromTo(
          this.position[0],
          { y: -7, immediateRender: false },
          {
            y: 0,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ".section3",
              start: "top bottom",
              end: "top top",
              onEnter: () => {
                this.fadeItems("#step2-content", 1);
              },
              onEnterBack: () => {
                this.fadeItems("#step2-content", 1);
              },
              onLeave: () => {
                this.fadeItems("#step2-content", 0);
              },
              onLeaveBack: () => {
                this.fadeItems("#step2-content", 0);
              },
            },
          }
        )
        .fromTo(
          this.position[0],
          { y: 0, immediateRender: false },
          {
            y: 7,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ".section4",
              start: "top bottom",
              end: "top top",
              onEnter: () => {
                this.fadeItems("#step3-content", 1);
              },
              onEnterBack: () => {
                this.fadeItems("#step3-content", 1);
              },
              onLeave: () => {
                this.fadeItems("#step3-content", 0);
              },
              onLeaveBack: () => {
                this.fadeItems("#step3-content", 0);
              },
            },
          }
        )
        .fromTo(
          this.position[0],
          { y: 7, immediateRender: false },
          {
            y: 15,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ".section5",
              start: "top bottom",
              end: "top top",
              onEnter: () => {
                this.fadeItems("#step4-content", 1);
              },
              onEnterBack: () => {
                this.fadeItems("#step4-content", 1);
                this.fadeItems("#step5-content", 0);
              },
              onLeave: () => {
                this.fadeItems("#step4-content", 0);
                this.fadeItems("#step5-content", 1);
              },
              onLeaveBack: () => {
                this.fadeItems("#step4-content", 0);
              },
            },
          }
        );
      this.position[0].y = -15;
    },
  },
  mounted() {
    this.gsapControl = gsap.timeline();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    window.addEventListener("resize", () => {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    });
  },
  methods: {
    rotate() {
      if (!this.modelEntered && this.position[0].y < -15) {
        this.position[0].y += 0.1;
      } else if (!this.modelEntered) {
        this.fadeItems(".scroll-more-text", 1);
        this.modelEntered = true;
        this.position[0].y = -15;
      }
      requestAnimationFrame(this.rotate);
    },
    fadeItems(id, opacity, duration = 1) {
      const tl = gsap
        .timeline({
          paused: true,
          defaults: { duration: duration },
        })
        .to(id, { opacity: opacity });

      tl.restart();
    },
  },
};
</script>
<style lang="scss" scoped>
.demo-class {
  height: 100vh;
  article {
    opacity: 0;
    position: fixed;
    z-index: 1;
    top: 40vh;
    width: 400px;
    color: white;
  }
}
.demo-button {
  position: fixed;
  top: 300px;
  z-index: 1;
}
.scroll-more-text {
  position: relative;
  z-index: 1;
  padding-top: 170px;
  opacity: 0;
}
.register-button {
  position: fixed;
  z-index: 1;
  bottom: 100px;
  background-image: url("../assets/images/button.png");
  background-size: cover;
  display: block;
  font-size: 24px;
  font-family: sans-serif;
  text-decoration: none;
}
#step5-content {
  display: flex;
  justify-content: center;
  opacity: 0;
}
</style>
