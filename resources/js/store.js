import { defineStore } from 'pinia';
import moment from "moment";

export const useStore = defineStore('main', {
  state: () => {
    return {
      currentChannel: null,
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
        votingStartedAt: null,
        votingDuration: null,
      },
    }
  },

  actions: {
    setParticipant(id, name) {
      this.participant.name = name;
      this.participant.id = id;
    },
    setRoom({uuid, name, ownerName, votingStartedAt, votingDuration}, isOwner = false) {
      this.room.uuid = uuid;
      this.room.name = name;
      this.room.ownerName = ownerName;
      this.room.isOwner = isOwner;
      this.room.votingStartedAt = votingStartedAt;
      this.room.votingDuration = votingDuration;
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
    },
    openChannel() {
      this.currentChannel = Echo.join(`room.${this.room.uuid}`)
        .here((participants) => {
          this.setParticipants(participants);
        })
        .joining((participant) => {
          this.addParticipant(participant);
        })
        .leaving((participant) => {
          this.removeParticipant(participant);
        })
        .error((error) => {
          console.error(error);
        });
    },
    closeChannel() {
      if (!this.currentChannel) {
        return;
      }

      Echo.leave(`room.${this.room.uuid}`);
      this.currentChannel = null;
    },
    listenOnChannel(event, callback) {
      if (!this.currentChannel) {
        console.error('Currently no channel to listen to!');
        return;
      }

      this.currentChannel.listen(event, callback);
    },
    startVoting(startTime, duration) {
      this.room.votingStartedAt = startTime;
      this.room.votingDuration = duration;
    }
  },

  getters: {
    currentRoomId: (state) => state.room.uuid,
    currentRoomName: (state) => state.room.name,
    currentRoomOwnerName: (state) => state.room.ownerName,
    currentParticipantName: (state) => state.participant.name,
    currentIsOwner: (state) => state.room.isOwner,
    getParticipants: (state) => state.room.participants,
    getVoteEndTime: (state) => {
      if (!state.room.votingStartedAt) {
        return null;
      }

      if (!state.room.votingDuration) {
        return moment(state.room.votingStartedAt);
      }

      return moment(state.room.votingStartedAt).add(state.room.votingDuration, 'seconds');
    },
  },
});
