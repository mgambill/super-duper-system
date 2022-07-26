<template>
  <div>
    <LabelField :field="field" />
    <div :class="[field.direction === 'vertical' ? '' : '', 'space-x-4 ']">
      <template v-for="($value, $key) in field.options" :key="$value">
        <label class="inline-flex items-center">
          <input type="checkbox" :value="valueFieldResolver($value, $key)" class="w-5 h-5 border-gray-200" v-model="collection" />
          <span class="block ml-2 text-sm"> {{ $value }}</span>
        </label>
      </template>
      <label class="inline-flex items-center" v-if="field.allowOther">
        <input type="checkbox" :value="valueFieldResolver('Other', -1)" class="w-5 h-5 border-gray-200" v-model="collection" />
        <span class="block ml-2 text-sm">Other</span>
      </label>
    </div>
    <template v-if="field.allowOtherText">
      <div class="mt-6" v-if="otherFieldVisible">
        <textarea rows="6" class="w-full border-gray-200 rounded-sm" v-model="otherText"></textarea>
      </div>
    </template>
  </div>
</template>

<script setup>
import LabelField from "./labelField.vue";
import { computed, ref, watch, watchEffect } from "vue";
import { useField } from "./index";
const props = defineProps({ field: Object, modelResolver: Function });
const { field, valueFieldResolver, modelValue, setValue, getValue } = useField(props, { initialValue: [] });
const collection = ref(getValue({ field: props.field, key: props.field.property }) ?? []);
const otherFieldVisible = ref(false);
const otherText = ref(getValue({ key: field.otherProperty, field }));
field.allowOtherText
  ? watchEffect(() => {
      console.log(modelValue.value);
      let hasOther = modelValue.value?.includes("Other") ?? false;
      otherFieldVisible.value = hasOther;
      if (hasOther == false) {
        otherText.value = null;
      }
    })
  : false;
watchEffect(() => {
  console.log("WATCH", otherText);
  setValue({ value: otherText, field: props.field, key: props.field.otherProperty });
});
watchEffect(() => {
  setValue({ value: collection, field: props.field, key: props.field.property });
});
</script>