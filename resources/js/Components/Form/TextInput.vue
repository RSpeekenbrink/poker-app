<script setup>
import { uniqueId } from "lodash";

const props = defineProps({
  error: String,
  label: String,
  labelSrOnly: {
    type: Boolean,
    default: false,
  },
  modelValue: String,
  name: String,
});

defineEmits(['update:modelValue']);

const id = uniqueId('input_');
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700"> {{ label }} </label>
    <div class="mt-1 relative">
      <input :id="id"
             :name="name"
             type="text"
             required=""
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
             class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
             :class="error ? 'border-red-300 text-red-900 placeholder-red-300' +
                      'focus:ring-red-500 focus:border-red-500' : 'placeholder-gray-400 focus:ring-indigo-500' +
                       'border-gray-300 focus:border-indigo-500'"
             v-bind="$attrs"

      />
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <p class="mt-2 text-sm text-red-600" v-if="error">{{ error }}</p>
  </div>
</template>
