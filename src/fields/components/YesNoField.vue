<template>
  <div>
    <LabelField :field="field" />
    <div :class="[field.direction === 'vertical' ? '' : '', 'space-x-4 ']">
      <label class="inline-flex items-center">
        <input type="radio" :name="field.property" class="w-5 h-5 border-gray-200" v-model="value" :value="true" />
        <span class="block ml-2 text-sm"> {{ field.yesText ? field.yesText : "Yes" }}</span>
      </label>
      <label class="inline-flex items-center">
        <input type="radio" :name="field.property" class="w-5 h-5 border-gray-200" v-model="value" :value="false" />
        <span class="block ml-2 text-sm"> {{ field.noText ? field.noText : "No" }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import LabelField from "./LabelField.vue";
import { defineProps, inject, computed } from "vue";
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
    else datasource[field.property] = value
  },
});
</script>