<script setup>
import { LogoutIcon } from '@heroicons/vue/solid';
import { Link } from '@inertiajs/inertia-vue3';
</script>

<template>
  <Link type="button"
        as="button"
        :href="route('room.leave')"
        method="post"
        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4
  font-medium rounded-md text-red-500 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2
  focus:ring-red-500"
  >
    <LogoutIcon class="h-5 w-5" />
  </Link>
</template>
