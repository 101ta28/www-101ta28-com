<template>
  <q-page class="text-center">
    <div>
      <h1>Tatsuya Imai's portfolio</h1>
      <h4>Web engineer</h4>
    </div>
    <q-separator spaced inset />
    <div>
      <q-btn flat icon="person" label="Profile" to="{ hash: 'Profile' }" />
    </div>
    <div>
      <h3>Profile</h3>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
});
</script>
