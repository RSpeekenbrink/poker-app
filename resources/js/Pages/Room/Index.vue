<script setup>
import { useStore } from '@/store';

const store = useStore();

const props = defineProps({
  participant: Object,
  room: Object,
});

store.setParticipant(props.participant.id, props.participant.name);

store.setRoom(props.room.id, props.room.name, props.room.isOwner);

Echo.join(`room.${store.currentRoomId}`)
  .here((participants) => {
    store.setParticipants(participants);
  })
  .joining((participant) => {
    store.addParticipant(participant);
  })
  .leaving((participant) => {
    store.removeParticipant(participant);
  })
  .error((error) => {
    console.error(error);
  })
</script>

<template>
  <div class="h-full">
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">{{ store.currentRoomName }}</h2>
      </div>

      <div>
        <ul>
          <li v-for="participant in store.getParticipants">{{ participant.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
