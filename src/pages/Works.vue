<template>
  <q-page class="text-center">
    <h2>
      <q-icon name="code" />
      Works
    </h2>
    <q-separator spaced inset />
    <h4>私が開発に携わったものです。</h4>
    <div class="flex">
      <q-card flat bordered class="my-card">
        <img src="img/ar_paper.jpg" />
        <q-card-section>
          <div class="text-overline text-orange-9">2019年頃</div>
          <div class="text-h6">室内情報可視化の研究</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pt-none">
          IoTと拡張現実技術を組み合わせた、室内情報可視化の研究を行っていました。
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
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
});
</script>
