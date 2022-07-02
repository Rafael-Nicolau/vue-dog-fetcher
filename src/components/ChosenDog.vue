<template>
  <div>
    <h4>Your chosen breed:</h4>
  </div>
  <div class="container">
    <h2>Dog Breed: {{ dogBreed }}</h2>
    <img :src="imgUrl" alt="Dog Image" />
    <ul>
      <h3>About this dog:</h3>
      <li><span>Size(cm):</span> {{ dogSize }}</li>
      <li><span>Weight(kg):</span> {{ dogWeight }}</li>
      <li><span>Bred for:</span> {{ dogBredFor }}</li>
      <li><span>Breed Group:</span> {{ dogBreedGroup }}</li>
      <li><span>Life Span:</span> {{ dogLifeSpan }}</li>
      <li><span>Temperament:</span> {{ dogTemperament }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  dogBreed: String,
  imgUrl: String,
  dogSize: String,
  dogWeight: String,
  dogBredFor: String,
  dogBreedGroup: String,
  dogLifeSpan: String,
  dogTemperament: String,
});
</script>

<style lang="scss" scoped>
@import "../scss/dogComponent";
</style>
