<template>
  <div>
    <LabelField :field="field" />
    <BaseTextField type="date" :field="field" v-model="localModelValue" />
  </div>
</template>

<script setup>
import { computed, isRef, isReactive, isReadonly } from "vue";
import { useField } from "./index";
const props = defineProps({ field: Object, modelResolver: Function });

const dateToString = (value) => {
  //console.log("DateField:read", value, typeof value);
  if (value === undefined) return;
  if (value instanceof Date) return value.toISOString().substring(0, 10);
  if (typeof value === "string") return value?.substring(0, 10);
  return value;
};

const stringToDate = (value) => {
  //console.log("DateField:write", value, typeof value);
  if (value === undefined) return;
  if (value instanceof Date) return value;
  return new Date(Date.parse(value));
};

const { field, modelValue, setValue } = useField(props);

const localModelValue = computed({
  get: () => dateToString(modelValue.value),
  set: (val) => (modelValue.value = stringToDate(val)),
});
</script>