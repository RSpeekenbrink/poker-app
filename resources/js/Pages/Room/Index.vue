<script setup>
import { useStore } from '@/store';

const store = useStore();

const props = defineProps({
  participant: Object,
  room: Object,
});

store.setParticipant(props.participant.id, props.participant.name);

store.setRoom(props.room.id, props.room.name, props.room.isOwner);
</script>

<template>
  <div>{{ store.currentRoomName }}</div>
</template>
