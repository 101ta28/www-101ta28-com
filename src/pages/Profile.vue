<template>
  <q-page class="text-center">
    <h2><q-icon name="person" /> Profile</h2>
    <q-separator spaced inset />
    <h3>自己紹介</h3>
    <div>
      <p class="text-body1">
        はじめまして。今井竜也と申します。
        <br />
        中学時代にプログラミングに興味を持ち、高校・大学を中退するまではWebやサーバー管理についてやっていました。
        <br />
        プログラミング言語はPythonが好きで開発で利用することが多いです。
        <br />
        Web系ではReactやRuby on Rails,
        Vue.jsのフレームワークであるQuasarを使うことが多いです。
      </p>
    </div>
    <h3>よく利用する技術・言語</h3>
    <q-btn
      icon="img:img/vscode.svg"
      href="https://code.visualstudio.com"
      target="_brank"
      rel="noopener noreferrer"
      flat
      round
      style="font-size: 3rem"
    />
    <q-btn
      icon="img:img/Octocat.png"
      href="https://github.com"
      target="_brank"
      rel="noopener noreferrer"
      flat
      round
      style="font-size: 3rem"
    />
    <q-btn
      icon="img:img/python.svg"
      href="https://www.python.org"
      target="_brank"
      rel="noopener noreferrer"
      flat
      round
      style="font-size: 3rem"
    />
    <q-btn
      icon="img:img/rails.svg"
      href="https://rubyonrails.org"
      target="_brank"
      rel="noopener noreferrer"
      flat
      round
      style="font-size: 3rem"
    />
    <q-btn
      icon="img:img/react.svg"
      href="https://reactjs.org/"
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
});
</script>
