<template>
  <div>
    <h1>DogFetch</h1>
    {{ dog }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import getDogs from "@/api/getDogs";

export default defineComponent({
  name: "DogFetch",
  setup() {
    const dog = ref([]);
    onMounted(async () => (dog.value = await getDogs("")));
    return { dog };
  },
});
</script>

<style scoped></style>
