<template>
  <div>
    <dog-fetch />
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
