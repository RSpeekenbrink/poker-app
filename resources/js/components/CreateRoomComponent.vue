<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a room</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        by
        {{ ' ' }}
        <a href="https://rspeekenbrink.co.uk"
           class="font-medium text-cyan-600 hover:text-cyan-500"
           target="_blank"
        >
          RSpeekenbrink
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="room_name" class="block text-sm font-medium text-gray-700"> Room name </label>
            <div class="mt-1">
              <input id="room_name"
                     name="room_name"
                     type="text"
                     required=""
                     v-model="form.room_name"
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
                                   shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500
                                   focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"> Your Name </label>
            <div class="mt-1">
              <input id="name"
                     name="name"
                     type="text"
                     required=""
                     v-model="form.name"
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
                                   shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500
                                   focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button @click="submit" class="w-full flex justify-center py-2 px-4 border border-transparent
                        rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$inertia.form({
        room_name: null,
        name: null,
      }),
    }
  },
  methods: {
    submit() {
      this.form.post(route('room.create'));
    }
  }
}
</script>
