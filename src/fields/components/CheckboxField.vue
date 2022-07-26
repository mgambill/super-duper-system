<template>
  <label class="items-center py-4 nline-flex">
    <input type="checkbox" class="w-5 h-5 border-gray-200" v-model="value" />
    {{ field.label }}
  </label>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { useField } from "./index";
const props = defineProps({ field: Object });
const { field, modelValue: value } = useField(props);
</script>