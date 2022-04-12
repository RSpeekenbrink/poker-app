import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      participant: {
        name: null,
        id: null,
      },
      room: {
        uuid: null,
        name: null,
        ownerName: null,
        participants: [],
        isOwner: false,
        voting: false,
      }
    }
  },

  actions: {
    setParticipant(id, name) {
      this.participant.name = name;
      this.participant.id = id;
    },
    setRoom({uuid, name, ownerName}, isOwner = false) {
      this.room.uuid = uuid;
      this.room.name = name;
      this.room.ownerName = ownerName;
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
    currentRoomId: (state) => state.room.uuid,
    currentRoomName: (state) => state.room.name,
    currentRoomOwnerName: (state) => state.room.ownerName,
    currentParticipantName: (state) => state.participant.name,
    currentIsOwner: (state) => state.room.isOwner,
    getParticipants: (state) => state.room.participants,
    currentlyVoting: (state) => state.room.voting,
  },
});
