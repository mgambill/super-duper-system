<template>
  <div class="table w-full max-w-xs">
    <div class="table-row">
      <template v-if="hp">
        <span class="items-center table-cell px-4 text-center border border-r-0 border-gray-200 rounded-l-sm bg-gray-50 whitespace-nowrap">{{ field.prefix }}</span>
      </template>
      <span class="table-cell border border-gray-200" :class="mc">
        <input :type="inputType" class="w-full placeholder-gray-200 border-0 rounded-sm min-w-min" v-bind="field.attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
      </span>
      <template v-if="hs">
        <span class="table-cell px-4 text-center border border-l-0 border-gray-200 rounded-r-sm bg-gray-50 whitespace-nowrap">{{ field.suffix }}</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import LabelField from "./labelField.vue";
import { defineProps, computed, inject } from "vue";
import { useField } from "./index";
const props = defineProps({
  field: Object,
  type: String,
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
const emits = defineEmits(["update:modelValue"]);
const { field } = useField(props);
const inputType = props.type ?? "text";
const hp = props.field.prefix !== undefined;
const hs = props.field.suffix !== undefined;
const mc = [hp ? "border-l-0" : "rounded-l-sm", hs ? "border-r-0" : "rounded-r-sm"];
</script>