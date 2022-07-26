<template>
  <tr>
    <template v-for="(cell, $colIndex) in field.cells" :key="`${props.index}:${$colIndex}`">
      <td class="p-4 bg-white border border-gray-200">
        <template v-for="(f, $i) in cell.fields" :key="f.id">
          <component :is="mapField(f)" :field="f" :depth="depth + 1" :index="$i" :modelResolver="resolver(f)" />
        </template>
      </td>
    </template>
    <td class="p-4 text-center border border-gray-200">
      <button class="text-3xl text-gray-400 hover:text-red-600" @click="onRemove(props.index)">&times;</button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { mapField, useField, isRef } from ".";

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
  modelResolver: Function,
});

console.log(props);
const { field, setValue, getValue } = useField(props);
const onRemove = (index) => {
  emit("remove", index);
};
const resolver = (field) => {
  const key = field.property;
  const parent = props.modelValue;
  //console.log("--resolver--", { key, parent });
  return () => ({
    get: () => {
      console.log("--> GridRow:get", { key, parent, field });
      const rawValue = getValue({ key, parent, field });
      return rawValue;
    },
    set: (value) => {
      //console.log("--> GridRow:set", { key, value, parent, field }, isRef(value));
      //return setValue({ key, value, parent, field });
      parent[key] = value;
    },
  });
};
</script>