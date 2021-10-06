<template>
  <section>
    <Page :layout="page.template" :page="page" :rules="rules" :datasource="datasource" />
  </section>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import { IRule } from "../types";
import axios from "../plugins/axios";
import Page from "../fields/Page.vue";

console.log(this);
const props = defineProps({
  playground_id: String,
});

const datasource = inject("datasource");
const rules = inject("rules");
const page = inject("page");
</script>