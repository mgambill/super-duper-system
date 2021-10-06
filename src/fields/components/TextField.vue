<template>
  <div>
    <LabelField :field="field" :depth="depth" :index="index" />
    <BaseTextField type="text" :field="field" />
  </div>
</template>

<script setup>
import LabelField from "./labelField.vue";
import BaseTextField from "./BaseTextField.vue";
import { defineProps } from "vue";
import { useField } from "./index";
const props = defineProps({
  field: Object,
  depth: { type: Number, default: 0 },
  index: { type: Number, default: -1 },
  
});
const { field, depth, index } = useField(props);
console.log({ field, depth, index } )
</script>