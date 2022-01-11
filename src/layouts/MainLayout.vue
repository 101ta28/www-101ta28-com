<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title @click="$router.push('/')" style="cursor:pointer">
          101ta28's Portfolio
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

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
import SideMenu from 'src/components/SideMenu.vue'

const linksList = [
  {
    title: 'Profile',
    icon: 'person',
    link: 'profile'
  },
  {
    title: 'Works',
    icon: 'list',
    link: 'works'
  },
  {
    title: 'Skill',
    icon: 'lightbulb',
    link: 'skill'
  },
  {
    title: 'Contact',
    icon: 'rss_feed',
    link: 'sns'
  },
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    SideMenu
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      sideMenuLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
