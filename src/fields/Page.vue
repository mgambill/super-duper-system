<template>
  <div class="flex">
    <div>
      <component :is="currentLayout">
        <template v-for="slotName in Object.keys(page.slots)" :key="slotName" v-slot:[slotName]="slotProps">
          <Container :fields="page.slots[slotName]" v-bind="slotProps" />
        </template>
      </component>
      <template v-for="(field, $index) in page.components">
        <component :is="mapField(field)" :field="field" :index="$index" />
      </template>
    </div>
    <div>
      <pre class="p-4 text-sm bg-yellow-100 rounded">{{ datasource }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide, reactive, defineExpose, onMounted } from "vue";
import type { InjectionKey, Ref } from "vue";
import { useLayouts } from "./layouts/index";
import { createDatasource, STATUS, initialize, mapField } from "./components";
import axios from "../plugins/axios";
import { sleep } from "../utils";
import type { ValidationResult, Page, PageState, Action } from "../types";
import { pageProvideKey } from "../types";
import { Evt } from "evt";
type Props = {
  layout: string;
  page: Page;
  datasource: Record<string, any>;
  rules: Object;
};

const props = defineProps<Props>();
const { currentLayout } = useLayouts(props.layout);
const { datasource } = createDatasource(props.datasource);
const evt = Evt.create<Action>();
const state = reactive<PageState>({
  datasource,
  page: props.page,
  actions: [],
  evt,
});

onMounted(() => {
  console.log("onMounted");
  initialize();
});

provide(pageProvideKey, state);

const validationHandler = (results: ValidationResult) => {
  for (let r of Object.values(results)) {
    if (r.propertyName === "") {
    } else {
      let c = context.value[r.propertyName];
      if (c) c.error[r.errorCode] = r;
      console.log({ r, c });
    }
  }
};

const validate = async (status: Ref<string>, results: Ref<string | [] | null>) => {
  status.value = STATUS.loading;
  results.value = null;
  try {
    const { data } = await axios.post<ValidationResult>("validate/loan", { entity: datasource.value, options: { rulesets: [] } });
    await sleep(300);
    if (Object.keys(data).length == 0) {
      for (let r of Object.values(context.value)) r.error = {};
      status.value = STATUS.success;
      results.value = "Validation Successful";
    } else {
      validationHandler(data);
      status.value = STATUS.failure;
      results.value = data;
    }
  } catch (error: any) {
    status.value = STATUS.error;
    results.value = error.message;
  }
};

defineExpose({
  validate,
});
</script>