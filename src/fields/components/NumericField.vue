<template>
  <div>
    <LabelField :field="field" />
    <BaseTextField type="number" :field="field" v-model.number="modelValue" />
  </div>
</template>

<script setup>
import { useField } from "./index";
const props = defineProps({ field: Object, modelResolver: Function });
const { field, modelValue } = useField(props, { write: (v) => Number(v) });
</script>