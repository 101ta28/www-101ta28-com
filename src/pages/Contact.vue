<template>
  <q-page class="text-center">
    <h2>
      <q-icon name="mail" />
      Contact
    </h2>
    <q-separator spaced inset />
    <h5>連絡先など</h5>
    <h6><q-icon name="mail" /> Email: workta28@gmail.com</h6>
    <q-btn
      v-for="(icon, i) in icons"
      :key="i"
      :icon="`img:img/${icon}`"
      :href="links[i]"
      target="_brank"
      rel="noopener noreferrer"
      flat
      round
      style="font-size: 2rem"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  setup() {
    return {
      icons: [
        "twitter.svg",
        "Octocat.png",
      ],
      links: [
        "https://twitter.com/101ta28",
        "https://github.com/101ta28",
        "https://ubuntu.com",
        "https://www.python.org",
        "https://rubyonrails.org",
        "https://reactjs.org",
        "https://quasar.dev",
      ],
    };
  },
});
</script>
