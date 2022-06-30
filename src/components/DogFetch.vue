<template>
  <navbar>
    <h1>Input a breed:</h1>
    <input v-model="userInput" placeholder="Golden Retriever" />
    <br />
    <p v-for="name in breedSearch" :key="name">{{ name }}</p>
  </navbar>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import getBreeds from "@/api/getBreeds";
import { breeds } from "@/api/types";

export default defineComponent({
  name: "DogFetch",
  setup() {
    const userInput = ref<string>("");
    const breeds = ref<breeds[]>([]);
    const breedName = ref<string[]>([]);

    onMounted(async () => {
      breeds.value = await getBreeds();
      for (let index = 0; index < breeds.value.length; index++) {
        breedName.value[index] = breeds.value[index].name;
      }
    });

    const breedSearch = computed(() => {
      if (userInput.value === "") {
        return [];
      }
      let matches = 0;
      return breedName.value.filter((name) => {
        if (
          name.toLowerCase().includes(userInput.value.toLowerCase()) &&
          matches < 5
        ) {
          matches++;
          return name;
        }
      });
    });

    return { userInput, breeds, breedName, breedSearch };
  },
});
</script>

<style scoped></style>
