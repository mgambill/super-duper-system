<template>
  <Layout>
    <template #header>
      <div class="flex justify-between px-4 sm:px-6 md:px-8">
        <div class="">
          <h1 class="text-3xl font-semibold text-gray-900">Playgrounds</h1>
        </div>
        <div class="fixed z-10 right-8">
          <button type="button" class="inline-flex items-center px-6 py-2 text-sm font-medium leading-4 text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="onValidate">Validate</button>
        </div>
      </div>
      <TransitionRoot as="template" :show="modalShow">
        <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="modalShow = false">
          <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
              <DialogOverlay class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </TransitionChild>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
                <template v-if="status === STATUS.success">
                  <div class="flex flex-col self-center justify-center flex-grow py-8 text-green-600 border">
                    <h1 class="pb-8 text-4xl font-medium text-center text-green-60">Validation Successful</h1>
                    <div class="flex items-center justify-center w-24 h-24 mx-auto bg-green-100 rounded-full">
                      <CheckIcon class="w-10 h-10" aria-hidden="true" />
                    </div>
                  </div>
                </template>
                <template v-else-if="status === STATUS.failure">
                  <div class="absolute right-8">
                    <button @click="onValidate">refresh</button>
                  </div>
                  <h1 class="pb-8 text-4xl font-medium text-center text-red-600">Validation Failed</h1>
                  <pre>{{ results }}</pre>
                </template>
                <template v-else-if="status === STATUS.error">
                  <h1 class="text-2xl text-red-600">Error</h1>
                  <pre>{{ results }}</pre>
                </template>
                <template v-else-if="status === STATUS.loading">
                  <div class="py-24 animate-pulse">
                    <h1 class="text-3xl text-center text-gray-400">loading . . .</h1>
                  </div>
                </template>
                <template v-else>
                  <pre>{{ { status, results } }}</pre>
                </template>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
    </template>
    <template #default>
      <pre>{{ { results, status } }}</pre>

      <Page :layout="page.template" :page="page" :rules="rules" :datasource="datasource" ref="pageComponent" />
    </template>
  </Layout>
</template>


<script setup lang="ts">
import { provide, ref, onMounted } from "vue";
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/outline";
import { IRule } from "../types";
import axios from "../plugins/axios";
import Page from "../fields/Page.vue";
import Rules from "../assets/rules.json";
import Fields from "../assets/fields";
import payload from "../assets/payload";
import { STATUS, useValidator } from "../fields/components";
const props = defineProps({
  playground_id: String,
});
const pageComponent = ref(null);
const rules = ref(Rules);
const page = ref(Fields[0]);
const datasource = ref({});

const modalShow = ref(false);
const status = ref(STATUS.empty);
const results = ref(null);

let onValidate = async (e) => {
  modalShow.value = true;
  await pageComponent.value.validate(status, results);
};
</script>