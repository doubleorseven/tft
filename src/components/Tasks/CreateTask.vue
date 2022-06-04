<template>
<div>
            <label class="sr-only" for="title">Title</label>
            <input class="w-full p-3 text-sm border-gray-200 rounded-lg" placeholder="Title" type="text" id="title" />
          </div>
<div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div>
              <input class="sr-only peer" id="d-easy" type="radio" tabindex="-1" name="difficulty"  />
              <label for="d-easy" class="block w-full p-3 border border-gray-200 rounded-lg peer-checked:bg-red-600 transition duration-200" tabindex="0">
                <span class="text-sm font-medium"> Easy </span>
              </label>
            </div>

            <div>
              <input class="sr-only peer" id="d-medium" type="radio" tabindex="-1"  name="difficulty" />
              <label for="d-medium" class="block w-full p-3 border border-gray-200 rounded-lg peer-checked:bg-red-600 transition duration-200"  tabindex="0">
                <span class="text-sm font-medium"> Medium </span>
              </label>
            </div>

            <div>
              <input class="sr-only peer" id="d-hard" type="radio" tabindex="-1" name="difficulty"  />
              <label for="d-hard" class="block w-full p-3 border border-gray-200 rounded-lg peer-checked:bg-red-600 transition duration-200" tabindex="0">
                <span class="text-sm font-medium"> Hard </span>
              </label>
            </div>
          </div>
</template>

<script setup lang="ts"></script>