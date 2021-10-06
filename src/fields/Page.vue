<template>
  <div class="flex">
    <div>
      <component :is="currentLayout">
        <template v-for="slotName in Object.keys(page.slots)" :key="slotName" v-slot:[slotName]="slotProps">
          <Container :fields="page.slots[slotName]" v-bind="slotProps" />
        </template>
      </component>
    </div>
    <div>
      <pre class="p-4 bg-yellow-100 rounded">{{ datasource }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { useLayouts, getLayouts } from "./layouts/index";
import { mapField, getFields } from "./components";

export default defineComponent({
  name: "Page",
  props: {
    layout: String,
    page: Object,
    datasource: Object,
    rules: Object,
  },
  components: {
    ...getLayouts(),
    ...getFields(),
  },
  setup(props) {
    provide("page", props.page);
    provide("datasource", props.datasource ?? {});
    const { currentLayout } = useLayouts(props.layout);
    return { currentLayout, page: props.page };
  },
});
</script>