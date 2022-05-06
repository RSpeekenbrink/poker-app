<script setup>
import { useStore } from '@/store';
import {useForm} from '@inertiajs/inertia-vue3';
import LogoutButton from "@/Components/Button/LogoutButton";
import ParticipantsStatus from "@/Components/ParticipantsStatus";
import TextInput from "@/Components/Form/TextInput";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import { ref } from 'vue';
import moment from "moment";

const store = useStore();

let loading = ref(false);

const props = defineProps({
  participant: Object,
  room: Object,
});

const form = useForm({
  duration: 15,
});

const startVoting = () => {
  loading.value = true;

  form.post(route('room.startVoting', store.currentRoomId), {
    preserveScroll: true,
    onSuccess: () => loading.value = false,
  });
}

const votingStarted = (event) => {
  store.startVoting(event.time, event.duration);
}

let currentlyVoting = ref(false);
let votingSecondsLeft = ref(0);

setInterval(() => {
  let voteEnd = store.getVoteEndTime;

  if (!voteEnd) {
    currentlyVoting.value = false;
  }

  votingSecondsLeft.value = voteEnd.diff(moment(), 'seconds');
  currentlyVoting.value = votingSecondsLeft.value > 0;
}, 100)

store.setParticipant(props.participant.id, props.participant.name);

store.setRoom(props.room, props.room.isOwner);

store.openChannel();

store.listenOnChannel('.voting.started', votingStarted);
</script>

<template>
  <div class="h-full">
    <div class="min-h-full flex flex-col justify-center py-4 sm:px-6 lg:px-8 relative">
      <div class="w-1/2 mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-2 text-center text-xl sm:text-3xl font-extrabold text-gray-900">
          {{ store.currentRoomName }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Initiator: {{ store.currentRoomOwnerName }}
        </p>

        <div class="absolute right-5 top-5">
          <LogoutButton />
        </div>
      </div>

      <div v-if="!store.getParticipants.length" class="mx-auto mt-4">
        <svg class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>

      <div v-else class="w-full sm:mx-auto sm:max-w-md mt-4">
        <ParticipantsStatus :participants="store.getParticipants" />

        <div class="mt-5">
          <template v-if="currentlyVoting">
            Voting in progress, seconds left: {{ votingSecondsLeft }}
          </template>

          <template v-else-if="store.currentIsOwner">
            <div class="mx-auto w-2/3 sm:w-1/2">
              <text-input label="Voting time (seconds)"
                          v-model="form.duration"
                          type="number"
                          :error="form.errors.duration" />
              <primary-button @click="startVoting"
                              class="mt-3"
                              :disabled="loading" >
                Start vote
              </primary-button>
            </div>
          </template>

          <template v-else>
            <div>
              <div class="mx-auto w-2/3 sm:w-1/2">
                Waiting for the Initiator to start voting...
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
