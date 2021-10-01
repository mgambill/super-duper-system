<template>
  <router-view :key="route.fullUrl" />
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>


