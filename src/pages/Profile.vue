<template>
  <q-page class="text-center">
    <h2>
      <q-icon name="person" />
      Profile
    </h2>
    <q-separator spaced inset />
    <h5>自己紹介</h5>
    <div>
      <p class="text-body1">
        はじめまして。今井竜也と申します。
        <br />
        中学時代にプログラミングに興味を持ち、高校・大学を中退するまではWebやサーバー管理についてやっていました。
        <br />
        プログラミング言語はPythonが好きで開発で利用することが多いです。
        <br />
        Web系ではReactやRuby on Rails、
        Vue.jsフレームワークのQuasarを使うことが多いです。
      </p>
    </div>
    <h3>よく利用する技術・言語</h3>
    <q-btn
      v-for="(icon, i) in icons"
      :key="i"
      :icon="`img:img/${icon}`"
      :href="links[i]"
      target="_brank"
      rel="noopener noreferrer"
      flat
      round
      style="font-size: 3rem"
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
        "vscode.svg",
        "Octocat.png",
        "ubuntu.svg",
        "python.svg",
        "rails.svg",
        "react.svg",
        "quasar.svg",
      ],
      links: [
        "https://code.visualstudio.com",
        "https://github.com",
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
