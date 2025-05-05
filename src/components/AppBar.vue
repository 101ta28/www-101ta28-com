<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon v-if='isMobile' @click='drawer = !drawer' />
    <v-app-bar-title>
      101ta28
    </v-app-bar-title>
    <v-spacer />
    <!-- <div v-if='isDesktop'>
      <v-btn v-for='link in links' :key='link.text' link :href='link.pageLink' class='text-capitalize'
        :ripple='false'>{{ link.text }}</v-btn>
    </div> -->
    <!-- !mobile -->
    <div v-if='!isMobile'>
      <v-btn v-for='link in links' :key='link.text' link :href='link.pageLink' class='text-capitalize'
        :ripple='false'>{{ link.text }}</v-btn>
    </div>
    <!-- change dark light mode icon button -->
    <v-btn icon @click='toggleTheme'>
      <v-icon>{{ theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model='drawer' app disable-resize-watcher>
    <v-list dense>
      <v-list-item v-for='link in links' :key='link.text' :href='link.pageLink' link>
        <v-icon>{{ link.icon }}</v-icon>
        <v-list-item-title>{{ link.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay, useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const drawer = ref(false)

const links = ref([
  { icon: 'mdi-home', text: 'Home', pageLink: '/' },
  { icon: 'mdi-code-tags', text: 'Work', pageLink: '/work' },
  { icon: 'mdi-post-outline', text: 'Blog', pageLink: 'https://blog.101ta28.com' },
  { icon: 'mdi-rss', text: 'Contact', pageLink: '/contact' },
])

const display = useDisplay()

const isMobile = display.mobile

</script>
