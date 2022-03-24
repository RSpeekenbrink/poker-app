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
        <div class="space-y-6">
          <div>
            <label for="room_name" class="block text-sm font-medium text-gray-700"> Room name </label>
            <div class="mt-1 relative">
              <input id="room_name"
                     name="room_name"
                     type="text"
                     required=""
                     v-model="form.room_name"
                     class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
                     :class="form.errors.room_name ? 'border-red-300 text-red-900 placeholder-red-300' +
                      'focus:ring-red-500 focus:border-red-500' : 'placeholder-gray-400 focus:ring-indigo-500' +
                       'border-gray-300 focus:border-indigo-500'"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="form.errors.room_name">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p class="mt-2 text-sm text-red-600" v-if="form.errors.room_name">{{ form.errors.room_name }}</p>
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"> Your name </label>
            <div class="mt-1 relative">
              <input id="name"
                     name="name"
                     type="text"
                     required=""
                     v-model="form.name"
                     class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
                     :class="form.errors.name ? 'border-red-300 text-red-900 placeholder-red-300' +
                      'focus:ring-red-500 focus:border-red-500' : 'placeholder-gray-400 focus:ring-indigo-500' +
                       'border-gray-300 focus:border-indigo-500'"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="form.errors.name">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p class="mt-2 text-sm text-red-600" v-if="form.errors.name">{{ form.errors.name }}</p>
          </div>

          <div>
            <button @click="submit" class="w-full flex justify-center py-2 px-4 border border-transparent
                        rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Room
            </button>
          </div>
        </div>
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
