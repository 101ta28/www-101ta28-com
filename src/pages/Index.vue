<template>
  <q-page class="text-center">
    <div>
      <h1>Tatsuya Imai's portfolio</h1>
      <h4>Web engineer</h4>
    </div>
    <q-separator spaced inset />
    <div>
      <q-btn flat icon="person" label="Profile" to="#profile"  />
      <q-btn flat icon="code" label="Works" to="#works" />
    </div>
    <div v-scroll="onScroll">
      <h3>Profile</h3>
    </div>
    <div id="#works">
      <h3>Works</h3>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  setup() {
    function onScroll(pos) {
    }
    return {onScroll}
  }
});
</script>
