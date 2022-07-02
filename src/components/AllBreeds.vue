<template>
  <div>
    <div v-if="isLoading">
      <h1>Loading, please wait...</h1>
    </div>
    <main v-if="!isLoading">
      <h3>All dogs breeds</h3>
      <router-link to="/" class="link"
        >(Or return to breed selection)</router-link
      >

      <div class="container-selection">
        <h4>Breeds per page:</h4>
        <select v-model="selectPerPage" @click="resetPage">
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="all">All</option>
        </select>
      </div>

      <div class="page-list" v-if="selectPerPage !== 'all'">
        <p @click="prevPage">Prev</p>
        <ul v-for="number in pages" :key="number">
          <li
            :class="number === currentPage && 'selected'"
            @click="currentPage = number"
          >
            {{ number }}
          </li>
        </ul>
        <p @click="nextPage">Next</p>
      </div>

      <section>
        <div v-for="breed in showPerPage" :key="breed" class="dog-breed">
          <router-link
            :to="{ name: 'index', query: { breed: breed.name } }"
            class="router-link"
          >
            <img :src="breed.image.url" alt="Dog Image" />
            <h2>{{ breed.name }}</h2>
          </router-link>
        </div>
      </section>

      <div class="page-list" v-if="selectPerPage !== 'all'">
        <p @click="prevPage">Prev</p>
        <ul v-for="number in pages" :key="number">
          <li
            :class="number === currentPage && 'selected'"
            @click="currentPage = number"
          >
            {{ number }}
          </li>
        </ul>
        <p @click="nextPage">Next</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import getBreeds from "@/api/getBreeds";
import { breeds } from "@/api/types";

const isLoading = ref<boolean>(true);
const allBreeds = ref<breeds[]>([]);
const selectPerPage = ref<string>("10");
const currentPage = ref<number>(1);

const pages = computed(() => {
  return Array.from(
    {
      length: Math.ceil(
        (allBreeds.value.length + 1) / parseInt(selectPerPage.value)
      ),
    },
    (_, index) => {
      return index + 1;
    }
  );
});

const resetPage = () => {
  return (currentPage.value = 1);
};

const nextPage = () => {
  if (currentPage.value >= pages.value.length) {
    return (currentPage.value = 1);
  } else {
    return (currentPage.value = currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value <= 1) {
    return (currentPage.value = pages.value.length);
  } else {
    return (currentPage.value = currentPage.value - 1);
  }
};

const showPerPage = computed(() => {
  if (selectPerPage.value === "all") {
    return allBreeds.value;
  }
  const firstJobIndex = (currentPage.value - 1) * parseInt(selectPerPage.value);
  const lastJobIndex = currentPage.value * parseInt(selectPerPage.value);
  return allBreeds.value.slice(firstJobIndex, lastJobIndex);
});

onMounted(async () => {
  allBreeds.value = await getBreeds("");
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
@import "@/scss/AllBreeds";
</style>
