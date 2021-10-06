<template>
  <label v-if="field.label" class="block mb-4 font-medium">{{ field.label }}</label>
</template>

<script setup>
import { defineProps } from "vue";
import { useField } from "./index";
const props = defineProps({
  field: Object,
  depth: { type: Number, default: 0 },
  index: { type: Number, default: -1 },
});
const { field, index, depth } = useField(props);
</script>