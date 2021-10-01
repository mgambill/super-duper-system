<template>
  <section>
    {{ { p: props } }}
    {{ page.layout }}
  </section>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { IRule } from "../types";
import axios from "../plugins/axios";
import Rules from "../assets/rules.json";
import Fields from "../assets/fields.json";
import FieldLayout from "../fields/layouts/Layout.vue";

const props = defineProps({
  playground_id: Number,
});
console.log(props.playgroundId);
const rules = ref(Rules);
const page = ref(Fields[0]);
const controls = ref(Fields.controls);
const datasource = ref({
  dealid: 10,
});
/*
class ErrorResult {
  constructor(rule: IRule) {
    this.rule = rule;
  }
}

const Resolvers = {
  GreaterThan(rule, value) {
    console.log("GreaterThan", rule.Value, value);
    return rule.Value > +value;
  },
};

const RunRule = (source) => {
  const errors: ErrorResult[] = [];

  Rules.forEach((rule) => {
    let value = datasource[rule.property];
    let result = new ErrorResult(rule, value);
    if (value === null) {
      if (rule.token === "NotEmpty") {
        errors.push(result);
      }
    }
    var resolver = Resolvers[rule.token];
    if (resolver === undefined) {
      console.log(`Token ${rule.token} does not have a resolver setup.`);
      return;
    }

    if (resolver(rule.value, value) === false) errors.push(result);
  });

  errors.push("Error");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const r = Rules.find((r) => r.property == "DealId");

const results = RunRule(r);
*/
</script>