import { computed, readonly } from "vue"
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import EmptyLayout from './Empty.vue'
import MainLayout from './Main.vue'

const map = {
  'empty': EmptyLayout,
  'main': MainLayout
}

export const useLayouts = (route: RouteLocationNormalizedLoaded) => {
  const currentLayout = computed(() => {
    const layout: ('main' | 'empty') = route?.meta?.layout ?? 'main'
    
    return map[layout]
  })
  return { currentLayout }
}

export const getLayouts = () => readonly(Object.values(map))