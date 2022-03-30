import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      participant: {
        name: null,
        id: null,
      },
      room: {
        id: null,
        name: null,
        participants: [],
        isOwner: false,
      }
    }
  },

  actions: {
    setParticipant(id, name) {
      this.participant.name = name;
      this.participant.id = id;
    },
    setRoom(id, name, isOwner = false) {
      this.room.id = id;
      this.room.name = name;
      this.room.isOwner = isOwner;
    },
    setParticipants(participants) {
      this.room.participants = participants;
    },
    addParticipant(participant) {
      this.room.participants.push(participant);
    },
    removeParticipant(participant) {
      const index = this.room.participants.indexOf(participant);

      if (index !== undefined) {
        this.room.participants.splice(index, 1);
      }
    }
  },

  getters: {
    currentRoomId: (state) => state.room.id,
    currentRoomName: (state) => state.room.name,
    currentParticipantName: (state) => state.participant.name,
    getParticipants: (state) => state.room.participants,
  },
});
