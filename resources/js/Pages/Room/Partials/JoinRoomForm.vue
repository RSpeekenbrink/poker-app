<script setup>
import { useForm } from '@inertiajs/inertia-vue3';
import TextInput from "@/Components/Form/TextInput";
import {defineProps} from "vue";
import PrimaryButton from "@/Components/Button/PrimaryButton";

const props = defineProps({
  room: Object
});

const form = useForm({
  name: null,
});

const submit = () => {
  form.post(route('room.join.attempt', props.room.uuid));
}
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Join {{ room.name }}</h2>
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
          <text-input label="Your name"
                      name="name"
                      v-model="form.name"
                      :error="form.errors.name"
                      @keyup.enter="submit"
          />

          <div>
            <PrimaryButton @click="submit">
              Join Room
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
