<template>
  <nav>
    <h2>Choose a breed:</h2>
    <div class="search-box">
      <input
        type="text"
        @input="userInput = $event.target.value"
        v-model="userInput"
        placeholder="Golden Retriever"
        :disabled="!showBreedSearch"
      />
      <button @click="resetSearch()">New Search</button>
      <ul v-if="breedSearch.length && showBreedSearch">
        <li
          v-for="term in breedSearch"
          :key="term"
          @click="setBreed(term.name)"
        >
          {{ term.name }}
        </li>
      </ul>
      <!-- <p v-for="name in breedSearch" :key="name">{{ name }}</p> -->
    </div>
  </nav>
  <main>
    <div v-if="isLoading">
      <h1>Loading, please wait...</h1>
    </div>
  </main>
  <random-dog v-if="!isLoading && !onSearch" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import getBreeds from "@/api/getBreeds";
import { breeds } from "@/api/types";
import RandomDog from "./RandomDog.vue";

export default defineComponent({
  components: { RandomDog },
  name: "DogFetch",
  setup() {
    const isLoading = ref<boolean>(true);
    const onSearch = ref<boolean>(false);
    const userInput = ref<string>("");
    const breeds = ref<breeds[]>([]);
    const chosenBreed = ref<string>("");
    const showBreedSearch = ref<boolean>(true);

    onMounted(async () => {
      breeds.value = await getBreeds();
      isLoading.value = false;
    });

    const breedSearch = computed(() => {
      if (userInput.value === "") {
        return [];
      }
      let matches = 0;
      return breeds.value.filter((term) => {
        if (
          term.name.toLowerCase().includes(userInput.value.toLowerCase()) &&
          matches < 10
        ) {
          matches++;
          return term;
        }
      });
    });

    const setBreed = computed(() => (name: string) => {
      userInput.value = name;
      chosenBreed.value = name;
      showBreedSearch.value = false;
    });

    const resetSearch = computed(() => () => {
      userInput.value = "";
      chosenBreed.value = "";
      showBreedSearch.value = true;
    });

    return {
      userInput,
      breeds,
      breedSearch,
      setBreed,
      showBreedSearch,
      resetSearch,
      isLoading,
      onSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../scss/DogFetch";
</style>
