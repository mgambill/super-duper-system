<template>
  <div class="flex flex-col" :data-field-type="field.type">
    <table class="border-collapse">
      <tr>
        <template v-for="f in field.cells" :key="f.id">
          <td class="p-4 font-medium text-gray-600 border border-gray-200 bg-gray-50">
            {{ f.label }}
          </td>
        </template>
        <td class="w-10 p-4 font-medium text-gray-600 border border-gray-200 bg-gray-50">&nbsp;</td>
      </tr>
      <template v-if="collection?.length === 0 ?? collection === undefined">
        <tr>
          <td :colspan="props.field.cells.length + 1" class="p-4 text-gray-500 border border-gray-200">
            {{ field.emptyText }}
          </td>
        </tr>
      </template>
      <template v-for="(set, $rowIndex) in collection" :key="$rowIndex">
        <GridRow :field="props.field" :index="$rowIndex" @remove="onRemove" v-model="collection[$rowIndex]" />
      </template>
    </table>
    <p class="block mt-4 font-medium uppercase">
      <button class="p-4 text-sm font-medium tracking-wide text-blue-500 bg-blue-50" @click="onAdd">
        {{ field.addText }}
      </button>
    </p>
  </div>
</template>

<script setup>
import GridRow from "./GridRow.vue";
import { mapField, useField } from "./";
import { computed, inject, ref, watch, watchEffect } from "vue";

const props = defineProps({
  field: Object,
  depth: { type: Number, default: 0 },
  index: { type: Number, default: -1 },
  modelResolver: Function,
});

const { field, depth, index, setValue, getValue, modelValue } = useField(props);

const collection = ref(getValue({ field: props.field, key: props.field.property }) ?? []);

const onRemove = (index) => {
  collection.value.splice(index, 1);
};
const onAdd = () => {
  collection.value.push({});
};

watchEffect(() => {
  setValue({ value: collection, field: props.field, key: props.field.property });
});
</script>