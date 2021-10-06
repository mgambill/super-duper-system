<template>
  <div>
    // Empty
    <pre>{{ field }}</pre>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useField } from "./index";
const props = defineProps({ field: Object });
const { field } = useField(props);
</script>