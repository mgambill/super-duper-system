<template>
  <div>
    <LabelField :field="field" />
    <select class="w-full border-gray-200 rounded-sm" v-model="modelValue">
      <option :value="null"></option>
      <template v-for="($label, $key) in field.options" :key="$key">
        <option :value="valueFieldResolver($label, $key)">{{ $label }}</option>
      </template>
    </select>
  </div>
</template>

<script setup>
import { useField } from "./index";
const props = defineProps({ field: Object, changeResolver: Function });
const { field, valueFieldResolver, modelValue } = useField(props);
</script>