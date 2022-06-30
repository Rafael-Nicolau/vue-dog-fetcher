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
        <li v-for="name in breedSearch" :key="name" @click="setBreed(name)">
          {{ name }}
        </li>
      </ul>
      <!-- <p v-for="name in breedSearch" :key="name">{{ name }}</p> -->
    </div>
  </nav>
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
    const chosenBreed = ref<string>("");
    const showBreedSearch = ref<boolean>(true);

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
          matches < 10
        ) {
          matches++;
          return name;
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
      breedName,
      breedSearch,
      setBreed,
      showBreedSearch,
      resetSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
nav {
  margin-top: 10px;
  align-items: center;
  padding: 0;
  justify-content: left;
}

h2 {
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
}

input {
  margin: 10px auto;
  height: 3rem;
  width: 60%;
  padding: 0;
  border: 1;
  border-radius: 15px 0 0 15px;
  //position: fixed;
}

input::placeholder {
  font-family: "Ubuntu", sans-serif;
  font-size: 1.2rem;
  text-align: center;
}

input[type="text"] {
  font-family: "Ubuntu", sans-serif;
  font-size: 1.2rem;
  text-align: center;
}

button {
  background-color: lightblue;
  font-family: "Ubuntu", sans-serif;
  font-size: 1.2rem;
  height: 3.2rem;
  border-radius: 0 15px 15px 0;
}

button:hover {
  cursor: pointer;
  box-shadow: 0px 0px 7px 10px rgba(0, 0, 0, 0.55);
}

.search-box {
  width: 100%;
  margin: 0;
  padding: 0;
  ul {
    margin: 0;
    padding: 0;
    //border: 1px solid red;
    font-family: "Ubuntu", sans-serif;
    font-size: 1.5rem;
    position: absolute;
    top: 100px;
    width: 100%;
    text-align: center;
    list-style: none;
    border-radius: 15px;
    justify-self: center;
    align-self: center;
    vertical-align: middle;
    li {
      margin: 2px 0;
      width: 100%;
      background-color: lightblue;
      border: 1px solid black;
      border-radius: 15px;
      padding: 10px 0;
    }
    li:hover {
      cursor: pointer;
      box-shadow: 0px 0px 7px 10px rgba(0, 0, 0, 0.55);
    }
  }
}
</style>
