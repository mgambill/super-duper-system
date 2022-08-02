<template>
  <div>
    {{ field.content }}
  </div>
</template>

<script setup lang="ts">
import { useField } from ".";
const props = defineProps({
  field: Object,
  modelResolver: Function,
});
const { field, modelValue } = useField(props);
</script>
