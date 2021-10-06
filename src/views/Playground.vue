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
              <div class="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
                <template v-if="status === STATUS.success">
                  <div class="flex flex-col self-center justify-center flex-grow py-8 text-green-600 border">
                    <h1 class="pb-8 text-4xl font-medium text-center text-green-60">Validation Successful</h1>
                    <div class="flex items-center justify-center w-24 h-24 mx-auto bg-green-100 rounded-full">
                      <CheckIcon class="w-10 h-10" aria-hidden="true" />
                    </div>
                  </div>
                </template>
                <template v-else-if="status === STATUS.failure">
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
      <router-view />
    </template>
  </Layout>
</template>

<script setup>
import { provide, ref } from "vue";
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/outline";
import axios from "../plugins/axios";
import Rules from "../assets/rules.json";
import Fields from "../assets/fields.json";
const STATUS = {
  empty: "empty",
  loading: "loading",
  error: "error",
  ready: "ready",
  success: "success",
  failure: "failure",
};
const rules = ref(Rules);
const page = ref(Fields[0]);
const modalShow = ref(false);
const status = ref(STATUS.empty);
const results = ref("");
const payload = {
  Id: "94e22eeb-6d76-4ed1-b427-8661cfc25e31",
  Code: "L16954",
  Name: "The Strand at Town Center L16954",
  EmployeeId: 1338793928,
  DealId: 18114,
  Purposes: ["Acquisition", "Construction"],
  PurposeDescription: null,
  InitialMaturity: "2030-01-01T00:00:00.000Z",
  FullyExtendedMaturity: "2030-01-01T00:00:00.000Z",
  AllInRate: 3.33,
  FloorRate: 4.44,
  OriginationFee: 1.05,
  OriginationDate: "2020-01-01T00:00:00.000Z",
  Term: 120,
  IsSecured: true,
  IsCMBS: false,
  CMBSTicker: "CMBS Ticker",
  Commitment: 250000000,
  RateType: "Fixed",
  BenchmarkType: "Euribor",
  BenchmarkDescription: "Benchmark description",
  BenchmarkDuration: 30,
  BenchmarkAtClosing: 4.56,
  FloorType: "Benchmark",
  AmortizationType: "Interest Only",
  AmortizationDescription: "<p>Amortization description</p>",
  UseDetailedTiming: true,
  TimingNotes: "<p>Timing notes</p>",
  OngoingCovenants: "<p>Ongoing covenents</p>",
  ClosingCovenants: "<p>Closing conenents</p>",
  FutureFundingDescription: null,
  DebtStack: "<p>Debt stack</p>",
  IsFutureFunding: true,
  StatusType: "Published",
  OtherPurposeTypeDescription: "Other purpose description",
  IsSwappedToFixed: false,
  SwapDuration: 60,
  SwapRate: 5.42,
  CreditSpread: 4.5,
  LoanExtensions: [],
  CallProtections: [],
  CoverageTeam: [
    {
      id: 1338793901,
    },
    {
      id: 1338793850,
    },
    {
      id: 1338793489,
    },
    {
      id: 1338793928,
    },
  ],
  borrowers: [
    {
      id: "6902707e-8a3a-431b-861a-669938f6de73",
    },
  ],
  lenders: [
    {
      id: "6902707e-8a3a-431b-861a-669938f6de73",
    },
  ],
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const datasource = ref(payload);

provide("datasource", datasource);
provide("rules", rules);
provide("page", page);

const onValidate = async () => {
  status.value = STATUS.loading;
  results.value = null;
  modalShow.value = true;
  try {
    const { data } = await axios.post("validate/loan", { entity: datasource.value, options: { rulesets: [] } });
    await sleep(300);
    if (Object.keys(data).length == 0) {
      status.value = STATUS.success;
      results.value = "Validation Successful";
    } else {
      status.value = STATUS.failure;
      results.value = data;
    }
  } catch (error) {
    status.value = STATUS.error;
    results.value = error.message;
  }
};
</script>
