<template>
  <div class="p-6 bg-white rounded shadow-sm">
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-2 space-y-8">
        <template v-for="(items, key) in groups" :key="key">
          <Disclosure as="div" class="space-y-2" v-slot="{ open }">
            <DisclosureButton :class="[currentKey == key ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500']" @click="setCurrent(key)">
              <svg :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150']" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
              </svg>

              <span class="font-medium capitalize">
                {{ key === "undefined" ? "*Default" : key }}
              </span>
            </DisclosureButton>
            <DisclosurePanel class="mt-2">
              <template v-for="(item, index) in items" :key="index">
                <template v-if="item.token === 'Each'">
                  <template v-for="child in item.rules" :key="child.errorcode">
                    <router-link custom :to="{ name: 'rule-single', params: { collection_id, rule_id: child.id } }" v-slot="{ href, isActive, navigate }">
                      <a :href="href" @click="navigate" :class="[isActive ? '' : '', 'group rounded-md flex p-2 hover:bg-gray-50']">
                        <span class="block w-12 text-gray-400">
                          {{ child.errorcode }}
                        </span>
                        <span class="group-hover:text-gray-800">
                          {{ startCase(child.property) }}
                        </span>
                      </a>
                    </router-link>
                  </template>
                </template>
                <template v-else>
                  <router-link custom :to="{ name: 'rule-single', params: { collection_id, rule_id: item.id } }" v-slot="{ href, isActive, navigate }">
                    <a :href="href" @click="navigate" :class="[isActive ? '' : '', 'group rounded-md flex p-2 hover:bg-gray-50']">
                      <span class="block w-12 text-gray-400">
                        {{ item.errorcode }}
                      </span>
                      <span class="group-hover:text-gray-800">
                        {{ startCase(item.property) }}
                      </span>
                    </a>
                  </router-link>
                </template>
              </template>
            </DisclosurePanel>
          </Disclosure>
        </template>
      </div>
      <div class="col-span-3">
        <router-view :key="rule_id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRef, ref } from "vue";
import groupBy from "lodash-es/groupBy";
import startCase from "lodash-es/startCase";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import Rules from "../assets/rules.json";

export default {
  props: {
    collection_id: String,
    rule_id: String,
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  setup(props) {
    const collection_id = toRef(props, "collection_id");
    const rule_id = toRef(props, "rule_id");
    const groups = groupBy(Rules, (x) => (x.token === "Each" ? x.rules[0].ruleSet : x.ruleSet));
    const currentKey = ref();
    const setCurrent = (key) => {
      console.log(key);
      currentKey.value = key;
    };

    return { rules: Rules, groups, collection_id, rule_id, startCase, setCurrent, currentKey };
  },
};
</script>