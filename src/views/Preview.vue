<template>
  <div>
    <div class="container">
      <h1 style="margin: 96px 0px" class="text-center">
        Three js Journey Learning Curve Projects
      </h1>
      <div style="margin-top: 96px">
        <ul>
          <li v-for="project in projects" :key="project.name" class="my-4">
            <a :href="project.path">{{ project.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "previewPage",
  data() {
    return {
      projects: [
        {
          name: "Cube",
          path: "/cube",
        },
        {
          name: "Vue-3d-Loader",
          path: "/vue-3d-loader",
        },
        {
          name: "Hunted House",
          path: "/huntedHouse",
        },
        {
          name: "Galaxy Generator",
          path: "/galaxy-generator",
        },
        {
          name: "Scroll Based Animation",
          path: "/scroll-based-animation",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
