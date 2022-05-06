<script setup>
import { LogoutIcon } from '@heroicons/vue/solid';
import { Inertia } from '@inertiajs/inertia'
import { useStore } from '@/store';

const store = useStore();

const logout = () => {
  // Forget session in SPA and unsubscribe from room.
  store.closeChannel();

  // Post to logout route to logout session.
  Inertia.post(route('room.leave'));
}

</script>

<template>
  <button
    @click="logout"
    class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4
  font-medium rounded-md text-red-500 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2
  focus:ring-red-500"
  >
    <LogoutIcon class="h-5 w-5" />
  </button>
</template>
