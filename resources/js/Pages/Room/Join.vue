<script setup>
import JoinRoomForm from "@/Pages/Room/Partials/JoinRoomForm.vue";

const props = defineProps({
  room: Object
})
</script>

<template>
  <div class="h-full">
    <join-room-form :room="room"/>
  </div>
</template>
