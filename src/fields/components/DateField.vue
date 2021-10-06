<template>
  <div>
    <LabelField :field="field" />
    <BaseTextField type="date" :field="field" v-model="modelValue" />
  </div>
</template>

<script setup>
import { useField } from "./index";
const props = defineProps({ field: Object, changeResolver: Function  });
const { field, valueFieldResolver, modelValue } = useField(props);
/*
const props = defineProps({ field: Object });
const { field } = useField(props);

const datasource = inject("datasource");
const value = props.changeResolver
  ? computed(props.changeResolver)
  : computed({
      get: () => {
        return datasource[field.property];
      },
      set: (value) => {
        if (value == null || value === "") datasource[field.property] = null;
        else datasource[field.property] = value;
      },
    });
    */
</script>