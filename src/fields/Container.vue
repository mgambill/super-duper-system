<template>
  <template v-for="(field, $index) in fields" :key="field.id">
    <template v-if="field.fields">
      <template v-if="field.type === 'panel'">
        <section class="p-8" :data-field-type="field.type">
          <h3 class="mb-6 text-xl font-bold">{{ field.label }}</h3>
          <div class="space-y-10 text-gray-600">
            <Container :fields="field.fields" :key="field.id" :depth="depth + 1" :index="$index" />
          </div>
        </section>
      </template>
      <template v-else-if="field.type === 'column'">
        <div class="inline-flex space-x-4" :data-field-type="field.type">
          <template v-for="(field, $index) in field.fields" :key="field.id">
            <div class="flex-1">
              <component :is="mapField(field)" :key="field.id" :field="field" :depth="depth + 1" :index="$index" />
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <Container :fields="field.fields" :key="field.id" :depth="depth + 1" />
      </template>
    </template>
    <template v-else>
      <component :is="mapField(field)" :key="field.id" :field="field" :depth="depth + 1" />
    </template>
  </template>
</template>

<script>
import { mapField, getFields } from "./components";
export default {
  props: {
    fields: Array,
    field: Object,
    modelResolver: Function,
    depth: { type: Number, default: 0 },
    index: { type: Number, default: -1 },
  },
  setup(props) {
    return { fields: props.fields, depth: props.depth, mapField, index: props.index };
  },
};
</script>