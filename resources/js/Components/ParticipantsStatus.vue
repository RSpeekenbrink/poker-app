<script setup>
import { UserIcon } from '@heroicons/vue/outline';

const props = defineProps({
  participants: Array,
});
</script>

<template>
  <div>
    <div class="flow-root mt-6">
      <ul role="list" class="-my-5 divide-y divide-gray-200">
        <li v-for="participant in participants" :key="participant.id" class="py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <UserIcon class="h-8 w-8 rounded-full" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ participant.name }}
              </p>
            </div>
            <div>
              <span class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"> - </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
