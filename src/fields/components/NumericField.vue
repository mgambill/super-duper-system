<template>
  <div>
    <LabelField :field="field" />
    <BaseTextField type="number" :field="field" v-model="modelValue" />
  </div>
</template>

<script setup>
import { useField } from "./index";
const props = defineProps({ field: Object, changeResolver: Function });
const { field, modelValue } = useField(props, (v) => Number(v));
</script>