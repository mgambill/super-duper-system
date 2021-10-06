<template>
  <tr>
    <template v-for="(cell, $colIndex) in field.cells" :key="`${props.index}:${$colIndex}`">
      <td class="p-4 bg-white border border-gray-200">
        <template v-for="(f, $i) in cell.fields" :key="f.id">
          <component :is="mapField(f)" :field="f" :depth="depth + 1" :index="$i" :changeResolver="onchange(f)" />
        </template>
      </td>
    </template>
    <td class="p-4 text-center border border-gray-200"><button class="text-3xl" @click="onRemove(props.index)">&times;</button></td>
  </tr>
</template>

<script setup lang="ts">
import { mapField, useField, propConfiguration } from ".";
const emit =
  defineEmits<{
    (e: "remove", { field: object, index: number }): void;
  }>();
const props = defineProps({
  field: Object,
  depth: { type: Number, default: 0 },
  index: { type: Number, default: -1 },
  modelValue: Object,
  rowIndex: Number,
  changeResolver: Function,
});
const { field } = useField(props);
const onRemove = (ev, field, index) => {
  console.log(emit);
  emit("remove", index);
};
const onchange = (item) => (resolveValue) => ({
  get() {
    console.log("onchange:get", props.modelValue[item.property]);
    return props.modelValue[item.property];
  },
  set(value) {
    console.log("onchange:set", value, props.modelValue, field.property, item);
    if (value == null || value === "") props.modelValue[item.property] = null;
    props.modelValue[item.property] = resolveValue(value);
  },
});
</script>