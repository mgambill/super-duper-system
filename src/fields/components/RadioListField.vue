<template>
  <div>
    <LabelField :field="field" />
    <div :class="[field.direction === 'vertical' ? '' : '', 'space-x-4 ']">
      <template v-for="($value, $key) in field.options" :key="$value">
        <label class="inline-flex items-center">
          <input type="radio" :value="valueFieldResolver($value, $key)" :name="field.property" class="w-5 h-5 border-gray-200" v-model="modelValue" />
          <span class="block ml-2 text-sm select-none"> {{ $value }}</span>
        </label>
      </template>
    </div>
  </div>
</template>

<script setup>
import LabelField from "./labelField.vue";
import { useField } from "./index";
const props = defineProps({ field: Object });
const { field, valueFieldResolver, modelValue } = useField(props);
</script>