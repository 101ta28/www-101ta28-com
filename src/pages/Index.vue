<template>
  <q-page class="text-center">
    <div>
      <h2>Tatsuya Imai's portfolio</h2>
      <h4>Maker</h4>
    </div>
    <q-separator spaced inset />
    <div>
      <q-btn flat icon="person" label="Profile" to="profile" size="xl" />
      <q-btn flat icon="code" label="Works" to="works" size="xl"/>
      <q-btn flat icon="mail" label="Contact" to="contact" size="xl"/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
});
</script>
