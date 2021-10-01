<template>
  <dl class="sm:divide-y sm:divide-gray-200">
    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt class="text-sm font-medium text-gray-500">ID</dt>
      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ rule.id }}</dd>
    </div>
    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt class="text-sm font-medium text-gray-500">Property</dt>
      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ rule.property }}</dd>
    </div>
    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt class="text-sm font-medium text-gray-500">Condition(s)</dt>
      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <ul role="list" class="space-y-4">
          <template v-if="rule.token === 'Set'">
            <template v-for="(cond, k) in rule.rules" :key="k">
              <li class="flex items-center justify-between text-sm">
                <template v-for="(token, k) in [mapToken(cond.token)]" :key="k">
                  <TokenItem :property="rule.property" :token="token?.expression" :value="rule.value" />
                </template>
              </li>
            </template>
          </template>
          <template v-else>
            <li class="flex items-center justify-between text-sm">
              <template v-for="(token, k) in [mapToken(rule.token)]" :key="k">
                <TokenItem :property="rule.property" :token="token?.expression" :value="rule.value" />
              </template>
            </li>
          </template>
        </ul>
      </dd>
    </div>
    <template v-if="rule.when">
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">When</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <pre>{{ rule.when }}</pre>
          <TokenItem :property="rule.when.property" :token="mapToken(rule.when.token)" :value="rule.when.value" :rules="rule.when.rules" />

        </dd>
      </div>
    </template>
    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt class="text-sm font-medium text-gray-500">Message</dt>
      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ rule.message }}</dd>
    </div>

    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt class="text-sm font-medium text-gray-500">Error Code</dt>
      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ rule.errorcode }}</dd>
    </div>

    <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt class="text-sm font-medium text-gray-500">Rule Set</dt>
      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ rule.ruleSet }}</dd>
    </div>
  </dl>
</template>

<script lang="ts">
import { toRef } from "vue";
import groupBy from "lodash-es/groupBy";
import startCase from "lodash-es/startCase";
import Rules from "../assets/rules.json";
import Tokens from "../assets/tokens.json";
import { CheckIcon } from "@heroicons/vue/solid";
import TokenItem from "../components/TokenItem.vue";

const Flatten = (rules, arr) => {
  arr ??= [];
  rules.forEach((r) => {
    if (r.token === "Each") {
      Flatten(r.rules, arr);
    } else {
      arr.push(r);
    }
  });
  return arr;
};

export default {
  props: {
    collection_id: String,
    rule_id: String,
  },
  components: {
    CheckIcon,
    TokenItem,
  },
  setup(props) {
    const collection_id = toRef(props, "collection_id");
    const rule_id = toRef(props, "rule_id");
    const rule = Flatten(Rules).find((x) => x.id === rule_id.value);
    const mapToken = (t) => {
      console.log(Tokens[t], t);
      return Tokens[t];
    };
    return { rule, collection_id, rule_id, mapToken, tokens: Tokens, startCase };
  },
};
</script>
