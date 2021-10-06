<template>
  <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none">
    <div class="flex space-x-4">
      <div class="flex-grow h-full col-span-2 bg-white divide-y divide-gray-200 rounded-lg">
        <slot name="main"></slot>
      </div>
      <div class="flex-none h-full col-span-1 w-72">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "MainFieldLayout",
});
</script>