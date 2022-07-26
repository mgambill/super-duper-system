<template>
  <Teleport to="body">
    <div class="fixed inset-0" v-if="modalOpen">
      <div class="absolute inset-0 z-40 bg-black/80" @click="onClose"></div>
      <div class="relative z-50 flex flex-col items-center justify-center h-screen">
        <div class="w-full max-w-3xl bg-white rounded">
          <header class="relative p-4 border-b border-gray-200">
            <h3 class="text-2xl">{{ field.title }}</h3>
            <button class="absolute right-4 top-4" @click="onClose">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          <div class="p-4">
            <Container :field="field" :fields="field.fields" />
          </div>
          <div class="p-4 space-x-4 border-t border-gray-200">
            <template v-for="button in field.buttons.fields">
              <ButtonField :field="button" @click="onButttonClick(button)">{{ button.label }}</ButtonField>
            </template>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Container from "../Container.vue";
import { inject, ref } from "vue";
import { useField } from "./";
import { pageProvideKey } from "../../types";
import type { PageState, Field } from "../../types";
import { arrowFunctionExpression } from "@babel/types";

const modalOpen = ref(true);
const pageState = inject(pageProvideKey);
const props = defineProps<{ field: Field; index?: number }>();
const { field } = useField(props);

pageState?.evt
  .pipe((act) => {
    console.log("Action", act);
    return act.task === "ShowModal" ? act : null;
  })
  .attach((act) => {
    if (field.key === act.params[0]) modalOpen.value = true;
  });

function onClose() {
  modalOpen.value = false;
}
function onButttonClick(field) {
  if (field.action.task === "modal.close") modalOpen.value = false;
}
</script>