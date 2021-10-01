<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <!-- Static sidebar for desktop -->
    <div class="flex flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <Sidebar />
      </div>
    </div>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        <div class="py-6">
          <slot name="header">
            <div class="mx-auto px-4 sm:px-6 md:px-8">
              <h1 class="text-3xl font-semibold text-gray-900">{{ title }}</h1>
            </div>
          </slot>
          <div class="mx-auto px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <div class="py-4">
              <slot></slot>
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import Sidebar from "../partials/Sidebar.vue";
import { useRoute } from "vue-router";


// export const setTitle = (value) => {
//   title.value = value;
// };

export default defineComponent({
  components: { Sidebar },
  props: {
    title: String
  },
  setup() {
    const route = useRoute();
    const title = ref();

    console.log(">>", route.name, "title: ", route.meta?.title, title);

    watchEffect(() => {
      let heading = route?.meta?.title ?? "No Title (use slot to override or import setTitle function)";
      title.value = heading;
    });

    return {};
  },
});
</script>
