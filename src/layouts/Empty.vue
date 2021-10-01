<template>
  <slot>
    {{ route.name ?? 'Empty' }}
  </slot>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>