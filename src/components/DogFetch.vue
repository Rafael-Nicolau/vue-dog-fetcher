<template>
  <nav>
    <h2>Choose a breed:</h2>
    <router-link to="/breeds" class="link"
      >(Or See all available Breeds)</router-link
    >
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
  <chosen-dog
    v-if="!isLoading && onSearch"
    :dog-breed="breedSearch[0].name"
    :img-url="breedSearch[0].image.url"
    :dog-size="breedSearch[0].height.metric"
    :dog-weight="breedSearch[0].weight.metric"
    :dog-bred-for="breedSearch[0].bred_for"
    :dog-breed-group="breedSearch[0].breed_group"
    :dog-life-span="breedSearch[0].life_span"
    :dog-temperament="breedSearch[0].temperament"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import getBreeds from "@/api/getBreeds";
import { breeds } from "@/api/types";
import RandomDog from "./RandomDog.vue";
import ChosenDog from "./ChosenDog.vue";

export default defineComponent({
  components: { RandomDog, ChosenDog },
  name: "DogFetch",
  setup() {
    const isLoading = ref<boolean>(true);
    const onSearch = ref<boolean>(false);
    const userInput = ref<string>("");
    const breeds = ref<breeds[]>([]);
    const chosenBreed = ref<string>("");
    const showBreedSearch = ref<boolean>(true);

    onMounted(async () => {
      breeds.value = await getBreeds("");
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
          onSearch.value = true;
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
      onSearch.value = false;
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
