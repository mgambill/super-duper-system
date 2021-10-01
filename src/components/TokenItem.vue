<template>
  <template v-if="token == 'Or'">
    <div class="relative">
      <div class="absolute left-0 h-full border border-r-0 border-gray-50">Or</div>
      <section>
        <template v-for="rule in rules" :key="`${rule.property}${rule.token}${rule.value}`">
          <TokenItem :property="rule.property" :token="mapToken(rule.token)?.expression" :value="rule.value" :rules="rule.rules" />
        </template>
      </section>
    </div>
  </template>
  <div class="flex items-center flex-1 w-0 space-x-1">
    <span class="text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" />
      </svg>
    </span>
    <span>{{ startCase(property) }}</span>
    <span>{{ token }}</span>
    <span>{{ value }}</span>

    <pre>{{ { p:property, t:token, v:value } }}</pre>
  </div>
</template>

<script>
import { toRefs } from "vue";
import startCase from "lodash-es/startCase";
import Tokens from "../assets/tokens.json";
export default {
  props: {
    property: String,
    token: String,
    value: {},
    rules: Array,
  },
  setup(props) {
    const mapToken = (t) => {
      console.log(Tokens[t], t);
      return Tokens[t];
    };
    return { ...toRefs(props), startCase, mapToken };
  },
};
</script>