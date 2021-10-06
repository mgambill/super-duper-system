<template>
  <label class="items-center py-4 nline-flex">
    <input type="checkbox" class="w-5 h-5 border-gray-200" v-model="value" />
    {{ field.label }}
  </label>
</template>

<script setup>
import { defineProps, computed, inject, ref } from "vue";
import { useField } from "./index";
const props = defineProps({ field: Object });
const { field } = useField(props);
const datasource = inject("datasource");
const value = computed({
  get: () => {
    return datasource[field.property];
  },
  set: (value) => {
    if (value == null || value === "") datasource[field.property] = null;
    else datasource[field.property] = value;
  },
});
</script>