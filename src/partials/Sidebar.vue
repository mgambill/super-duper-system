<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- Sidebar component, swap this element with another sidebar if you like -->
  <div class="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
    <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4">
        <img class="w-auto h-8" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow" />
      </div>
      <nav class="flex-1 px-2 mt-5 space-y-1 bg-white">
        <template v-for="item in navigation" :key="item.name">
          <router-link custom :to="item.to" v-slot="{href, navigate, isActive }">
            <a :href="href" @click="navigate" :class="[isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
              <component :is="item.icon" :class="[isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
              {{ item.name }}
            </a>
          </router-link>
        </template>
      </nav>
    </div>
    <div class="flex flex-shrink-0 p-4 border-t border-gray-200">
      <a href="#" class="flex-shrink-0 block w-full group">
        <div class="flex items-center">
          <div>
            <img class="inline-block rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
            <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
          </div>
        </div>
      </a>
    </div>
  </div>
  <!-- Sidebar end -->
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
  SparklesIcon
} from "@heroicons/vue/outline";

const navigation = [
  { name: "Home", to: { name: 'home' }, icon: HomeIcon  },
  //{ name: "Team", to: { name: 'users' }, icon: UsersIcon  },
  { name: "Rule Collections", to: { name: 'rules-list' }, icon: FolderIcon },
  { name: "Schemas", to: { name: 'schemas-list' }, icon: CalendarIcon  },
  { name: "Playgrounds", to: { name: 'playground-list' }, icon: SparklesIcon  },
  // { name: "Documentation", href: "#", icon: InboxIcon  },
  // { name: "Source", href: "#", icon: ChartBarIcon  },
];

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    MenuIcon,
    XIcon,
    SparklesIcon
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      navigation,
      sidebarOpen,
    };
  },
};
</script>