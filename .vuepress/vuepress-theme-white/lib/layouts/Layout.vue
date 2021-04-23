<template>
  <div class="theme-container">
    <Navbar v-if="shouldShowNavbar">
      <template #before>
        <slot name="navbar-before" />
      </template>
      <template #after>
        <slot name="navbar-after" />
      </template>
    </Navbar>
    <Content />
    <Home v-if="frontmatter.home" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  inject,
  Transition,
} from "vue";
import { useRouter } from "vue-router";
import Home from "../components/Home.vue";
// import Page from '../components/Page.vue'
import Navbar from "../components/Navbar.vue";
import { usePagesData, usePageFrontmatter } from "@vuepress/client";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";

export default defineComponent({
  name: "layout",
  components: {
    Transition,
    Navbar,
    Home,
  },

  setup() {
    const page = usePagesData();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    // navbar
    const shouldShowNavbar = computed(
      () =>
        frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
    );

    return {
      frontmatter,
      page,
      shouldShowNavbar,
    };
  },
});
</script>
