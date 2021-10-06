<template>
  <div>
    <LabelField :field="field" />
    <textarea class="w-full border-gray-200 rounded-sm" v-model="modelValue"></textarea>
  </div>
</template>

<script setup>
import { useField } from "./index";
const props = defineProps({ field: Object, changeResolver: Function });
const { field, modelValue } = useField(props);
</script>