<template>
  <Layout>
    <template #header>
      <div class="flex justify-between px-4 sm:px-6 md:px-8">
        <div class="">
          <h1 class="text-3xl font-semibold text-gray-900">Playgrounds</h1>
        </div>
      </div>
    </template>
    <template #default>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <template></template>
                  <tr v-for="set in plagrounds" :key="set.email" @click="navigate(set)">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {{ set.name }}
                    </td>
                    <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const plagrounds = [
  {
    name: "Loans",
    id: "1",
  },
];

const navigate = (item) => {
  router.push({ name: "playground-single", params: { playground_id: item.id } });
};
</script>