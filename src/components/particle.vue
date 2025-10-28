<template>
  <div ref="canvas" class="particleContent position-fixed"></div>
</template>

<script>
import * as THREE from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { Star } from "../classes/particle.js";

export default {
  name: "particle",
  data: function () {
    const pixelRatio = 2;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.001,
      50
    );
    camera.position.z = 8;
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 0.6;
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(pixelRatio);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const group = new THREE.Group();
    scene.add(group);

    const vertexShader = `
attribute float size;
attribute vec3 color;
attribute float fade;

varying vec3 vColor;

void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size;
    gl_Position = projectionMatrix * mvPosition;
}
`;
    const fragmentShader = ` 
uniform sampler2D pointTexture;
varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor, 1.0);
    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
}
`;
    const sparklesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: {
          value: new THREE.TextureLoader().load("dotTexture.png"),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: THREE.AdditiveBlending,
      alphaTest: 1.0,
      transparent: true,
    });
    let galaxyColors = [
      new THREE.Color("#f9fbf2").multiplyScalar(0.8),
      new THREE.Color("#ffede1").multiplyScalar(0.8),
      new THREE.Color("#05c7f2").multiplyScalar(0.8),
      new THREE.Color("#0597f2").multiplyScalar(0.8),
      new THREE.Color("#0476d9").multiplyScalar(0.8),
    ];

    let prev = 0;

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      bloomPass: bloomPass,
      composer: composer,
      group: group,
      sparklesMaterial: sparklesMaterial,
      galaxyColors: galaxyColors,
      stars: null,
      starsGeometry: null,
      galaxyPoints: null,
      prev: prev,
    };
  },

  mounted: function () {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.stars = [];
    const galaxyGeometryVertices = [];
    const galaxyGeometryColors = [];
    const galaxyGeometrySizes = [];

    for (let i = 0; i < 1500; i++) {
      const star = new Star();
      star.setup(
        this.galaxyColors[Math.floor(Math.random() * this.galaxyColors.length)]
      );
      galaxyGeometryVertices.push(star.x, star.y, star.z);
      galaxyGeometryColors.push(star.color.r, star.color.g, star.color.b);
      galaxyGeometrySizes.push(star.size);
      this.stars.push(star);
    }
    this.starsGeometry = new THREE.BufferGeometry();
    this.starsGeometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(galaxyGeometrySizes, 1)
    );
    this.starsGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(galaxyGeometryColors, 3)
    );
    this.galaxyPoints = new THREE.Points(
      this.starsGeometry,
      this.sparklesMaterial
    );
    this.scene.add(this.galaxyPoints);
    requestAnimationFrame(this.render);
    window.addEventListener("resize", this.onWindowResize);
  },
  methods: {
    render() {
      requestAnimationFrame(this.render);

      this.galaxyPoints.rotation.y += 0.0005;

      // this.group.rotation.x = Math.sin(a * 0.0003) * 0.1;

      let tempStarsArray = [];
      this.stars.forEach((s) => {
        s.update();
        tempStarsArray.push(s.x, s.y, s.z);
      });

      this.starsGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(tempStarsArray, 3)
      );

      this.composer.render();
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.composer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.bloomPass.setSize(window.innerWidth, window.innerHeight);
    },
  },
};
</script>
