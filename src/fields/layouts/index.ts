import { computed, readonly } from "vue"
import EmptyLayout from './Empty.vue'
import MainLayout from './Main.vue'
import FullLayout from './Full.vue'


const map = {
  'empty': EmptyLayout,
  'main': MainLayout,
  'full': FullLayout
}

export const useLayouts = (layout = "main") => {

  const currentLayout = map[layout] ?? MainLayout

  return { currentLayout }
}

export const getLayouts = () => readonly(Object.values(map))