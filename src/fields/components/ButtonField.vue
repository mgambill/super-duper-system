<template>
  <button :class="buttonClass" @click="onClick">{{ field.label }}</button>
</template>

<script lang="ts" setup>
import { inject, unref, readonly, computed } from "vue";
import { useField } from "./index";
import { pageProvideKey, PageState, Field } from "../../types";
const pageState = inject(pageProvideKey);
const props = defineProps<{ field: Field; index: number }>();
const { field } = useField(props);
const buttonClass = computed(() => {
  const map = { primary: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" };
  const defaultClass = "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  return map[field.buttonType] || defaultClass;
});
function onClick() {
  const action = field.action;
  if (action === undefined) return;
  if (pageState) pageState.evt.post(readonly(unref(action)));
}
</script>