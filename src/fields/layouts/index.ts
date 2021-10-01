import { computed, readonly, defineProps } from "vue"
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import EmptyLayout from './Empty.vue'
import MainLayout from './Main.vue'
const props = defineProps({
  layout: String
})
const map = {
  'empty': EmptyLayout,
  'main': MainLayout
}

export const useLayouts = (route: RouteLocationNormalizedLoaded) => {

  const currentLayout = computed(() => {
    const layout: ('main' | 'empty') = route?.meta?.layout ?? 'main'
    return map[layout]
  })

  console.log('::Field UseLayouts::', route, currentLayout)

  return { currentLayout }
}

export const getLayouts = () => readonly(Object.values(map))