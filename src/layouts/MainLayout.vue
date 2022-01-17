<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="!$q.platform.is.desktop"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title v-if="$q.platform.is.desktop">
          101ta28's Portfolio
        </q-toolbar-title>

        <q-space />

        <q-btn
          v-if="$q.platform.is.desktop"
          label="Home"
          to="/"
          style="cursor: pointer"
          flat
          stretch
        />
        <q-btn
          v-if="$q.platform.is.desktop"
          label="Profile"
          to="profile"
          style="cursor: pointer"
          flat
          stretch
        />
        <q-btn
          v-if="$q.platform.is.desktop"
          label="Works"
          to="works"
          style="cursor: pointer"
          flat
          stretch
        />
        <q-btn
          v-if="$q.platform.is.desktop"
          label="Contact"
          to="contact"
          style="cursor: pointer"
          flat
          stretch
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="!$q.platform.is.desktop"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <SideMenu
          v-for="link in sideMenuLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SideMenu from "src/components/SideMenu.vue";

const linksList = [
  {
    title: "Profile",
    icon: "person",
    link: "profile",
  },
  {
    title: "Works",
    icon: "list",
    link: "works",
  },
  {
    title: "Contact",
    icon: "rss_feed",
    link: "contact",
  },
];

import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    SideMenu,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();

    return {
      sideMenuLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
