<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-start text-center fill-height">
      <v-icon class="text-h2">mdi-rss</v-icon>
      <h2 class="text-h2">Contact</h2>

      <div class="py-3" />

      <v-row class="d-flex align-start justify-center">
        <v-col cols="12" v-for="contact in contactList" :key="contact.title">
          <v-card class="mx-auto clickable" max-width="600" @click="openLink(contact.link)">
            <v-card-title primary-title class="d-flex align-center justify-center">
              <v-icon class="text-h4">{{ contact.icon }}</v-icon>
              <h4 class="text-h5 text-center">{{ contact.title }}</h4>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const contactList = ref([
  { title: 'Twitter', icon: 'mdi-twitter', link: 'https://twitter.com/101ta28' },
  { title: 'GitHub', icon: 'mdi-github', link: 'https://github.com/101ta28' },
  { title: 'Instagram', icon: 'mdi-instagram', link: 'https://www.instagram.com/101ta28/' },
])

const openLink = (link) => {
  window.open(link, '_blank')
}
</script>