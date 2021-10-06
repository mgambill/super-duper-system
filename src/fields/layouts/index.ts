import { computed, readonly } from "vue"
import EmptyLayout from './Empty.vue'
import MainLayout from './Main.vue'


const map = {
  'empty': EmptyLayout,
  'main': MainLayout
}

export const useLayouts = (layout = "main") => {

  const currentLayout = map[layout] ?? MainLayout

  return { currentLayout }
}

export const getLayouts = () => readonly(Object.values(map))