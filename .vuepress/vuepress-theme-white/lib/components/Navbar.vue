<template>
  <a-menu mode="horizontal">
    <div class="nav_title">
      <GithubFilled />
      {{ title }}
    </div>
    <a-select
      show-search
      v-model:value="searchValue"
      placeholder="rrr"
      style="width: 200px"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      @search="handleSearch"
    >
      <a-select-option v-for="v in result" :key="v.value">
        <div v-html="v.html"></div>
      </a-select-option>
    </a-select>
    <a-menu-item
      v-for="(v, i) in navItem"
      :key="'item' + i"
      @click="toLink(v.link)"
    >
      {{ v.text }}
      <OutboundLink v-if="isBlankTarget(v.link)" />
    </a-menu-item>
    <a-sub-menu v-for="(sub, i) in subMenu" :key="'sub' + i">
      <template #title>
        <span> {{ sub.text }} </span>
      </template>
      <a-menu-item
        v-for="(v, i) in sub.children"
        @click="toLink(v.link)"
        :key="'subItem' + i"
      >
        {{ v.text }}
        <OutboundLink v-if="isBlankTarget(v.link)" />
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
import { GithubFilled } from "@ant-design/icons-vue";
import { usePageHeadTitle } from "@vuepress/client";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";
import type {
  NavbarConfig,
  NavbarGroup,
} from "@vuepress/theme-default/lib/shared/nav";
export default defineComponent({
  components: {
    GithubFilled,
  },
  setup() {
    const searchValue = ref("");
    const themeLocale = useThemeLocaleData();
    const title = usePageHeadTitle();
    const searchList: string[] = inject("titleList");
    const router = useRouter();
    const isBlankTarget = (value: string) => value.includes("http");
    const toLink = (link) => {
      if (isBlankTarget(link)) {
        location.href = link;
      } else {
        router.push(link);
      }
    };
    const navbar: NavbarConfig = themeLocale.value.navbar;
    const logo = themeLocale.value.logo;
    const navItem = [];
    const subMenu = [];
    const result = ref<object[]>([]);
    const handleSearch = (val: string): void => {
      const res: object[] = [];
      searchList.forEach((v) => {
        if (val && v.includes(val)) {
          const a = v.replace(val, `<span style=color:red;>${val}</span>`);
          res.push({ value: v, html: a });
        }
      });
      result.value = res;
    };
    navbar.forEach((v) => {
      if ((v as NavbarGroup).children) {
        const children = (v as NavbarGroup).children.map((item) => {
          if (typeof item === "string") {
            return { text: item, link: item };
          } else {
            return item;
          }
        });
        (v as NavbarGroup).children = children;
        subMenu.push(v);
      } else if (typeof v === "string") {
        navItem.push({ text: v, link: v });
      } else {
        navItem.push(v);
      }
    });
    return {
      result,
      handleSearch,
      searchValue,
      isBlankTarget,
      toLink,
      logo,
      navItem,
      subMenu,
      title,
    };
  },
});
</script>