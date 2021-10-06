<template>
  <div>
    <LabelField :field="field" />
    <input type="text" class="w-full border-2 border-gray-200 rounded-sm" v-model="modelValue" />
  </div>
</template>

<script setup>
import { useField } from "./index";
const props = defineProps({ field: Object, changeResolver: Function });
const { field, modelValue } = useField(props);
</script>