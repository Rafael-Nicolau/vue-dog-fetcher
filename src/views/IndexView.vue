<template>
  <div>
    <dog-fetch />
    <h1>IndexView</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DogFetch from "@/components/DogFetch.vue";

export default defineComponent({
  name: "IndexView",
  components: { DogFetch },
});
</script>

<style scoped></style>
