<template>
  <div>
    <all-breeds />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AllBreeds from "@/components/AllBreeds.vue";

export default defineComponent({
  name: "AllBreedsView",
  components: { AllBreeds },
});
</script>

<style scoped></style>
