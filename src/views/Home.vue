<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <router-link to="/Games">
      <ClassicButton>Go Games</ClassicButton>
    </router-link>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import ClassicButton from "@/components/ClassicButton.vue";

export default defineComponent({
  name: "Home",
  components: {
    ClassicButton,
    HelloWorld,
  },
});
</script>
