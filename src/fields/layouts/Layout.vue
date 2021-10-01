<template>
  <div>
    <component :is="currentLayout">
      <template v-for="slotName in Object.keys($slots)" :key="slotName" v-slot:[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent } from "vue";
import { useLayouts, getLayouts } from "./index";
export default defineComponent({
  name: "App",
  components: {
    ...getLayouts(),
  },
  setup() {
    const route = useRoute();
    const { currentLayout } = useLayouts(route);
    return { currentLayout, route };
  },
});
</script>