<template>
  <q-page class="text-center">
    <h2>
      <q-icon name="code" />
      Works
    </h2>
    <q-separator spaced inset />
    <h5>私が開発に携わったものです。</h5>
    <div class="row items-start q-gutter-md">
      <q-card flat bordered class="my-card">
        <q-img src="img/ar_paper.jpg" />
        <q-card-section>
          <div class="text-overline text-orange-9">2019年頃</div>
          <div class="text-h6">室内情報可視化の研究</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-none">
          IoTと拡張現実技術を組み合わせた、室内情報可視化の研究を行っていました。
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-none">
          使用した技術
          <br />
          Unity, C#, Java
        </q-card-section>
      </q-card>

      <q-card flat bordered class="my-card">
        <q-img src="img/cirkit_hp.png" />
        <q-card-section>
          <div class="text-overline text-orange-9">2020年6月頃</div>
          <div class="text-h6">ホームページ再構築</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-none">
          株式会社CirKitの
          <a
            href="https://www.cirkit.jp/"
            target="_brank"
            rel="noopener noreferrer"
          >
            ホームページ
          </a>
          をスマートフォン対応にしました。
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-none">
          使用した技術
          <br />
          React, TypeScript
        </q-card-section>
      </q-card>

      <q-card flat bordered class="my-card">
        <q-img src="img/sakito_hp.png" />
        <q-card-section>
          <div class="text-overline text-orange-9">2020年10月頃</div>
          <div class="text-h6">学生向けアンケートサイトの保守管理</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-none">
          株式会社CirKitにて
          <a
            href="https://sakito.cirkit.jp/"
            target="_brank"
            rel="noopener noreferrer"
          >
            SAKITO
          </a>
          の新機能実装や保守管理を行いました。
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-none">
          使用した技術
          <br />
          Ruby on Rails, MySQL
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style lang="scss">
.my-card {
  width: 100%;
  max-width: 250px;
}
.my-card-sp {
  width: 100%;
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
});
</script>
