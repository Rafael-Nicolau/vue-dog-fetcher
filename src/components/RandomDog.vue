<template>
  <div>
    <h4>Random dog:</h4>
  </div>
  <div v-if="isLoading">
    <h4>Loading a random dog...</h4>
  </div>
  <div v-if="!isLoading" class="container">
    <h2>Dog Breed: {{ randomDog[0].breeds[0].name }}</h2>
    <img :src="randomDog[0].url" alt="Dog Image" />
    <ul v-for="item in randomDog[0].breeds" :key="item">
      <h3>About this dog:</h3>
      <li><span>Size(cm):</span> {{ item.height.metric }}</li>
      <li><span>Weight(kg):</span> {{ item.weight.metric }}</li>
      <li><span>Bred for:</span> {{ item.bred_for }}</li>
      <li><span>Breed Group:</span> {{ item.breed_group }}</li>
      <li><span>Life Span:</span> {{ item.life_span }}</li>
      <li><span>Temperament:</span> {{ item.temperament }}</li>
    </ul>
    <button @click="newRandomDog()">Another random dog</button>
  </div>
</template>

<script setup lang="ts">
import getDogs from "@/api/getDogs";
import { onMounted, ref } from "@vue/runtime-core";
import { Dog } from "@/api/types";

const isLoading = ref<boolean>(true);
const randomDog = ref<Dog[]>([]);

const newRandomDog = async () => {
  isLoading.value = true;
  randomDog.value = [];
  randomDog.value = await getDogs("");
  isLoading.value = false;
  async function checkBreeds() {
    if (randomDog.value[0].breeds.length === 0) {
      return (randomDog.value = await getDogs(""));
    }
    isLoading.value = false;
  }
  checkBreeds();
};

onMounted(() => newRandomDog());
</script>

<style lang="scss" scoped>
@import "../scss/dogComponent";
</style>
