<template>
  <section class="inset-y-0 left-0 flex">
    <div class="w-screen max-w-sm h-screen">
      <div class="flex flex-col h-full bg-gray-50">
        <header class="flex items-center justify-between h-16 pl-6">
          <span class="text-sm font-medium tracking-widest uppercase">
            TFT
          </span>

          <button aria-label="Close menu" class="w-16 h-16 " type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <nav class="flex flex-col text-sm font-medium text-gray-500 ">
          <!-- <RouterLink to="/" class="px-6 py-3"> {{$t("menu.home")}} </RouterLink> -->
          <RouterLink to="/tasks" class="px-6 py-3"> {{ $t("menu.tasks") }} </RouterLink>
          <!-- <RouterLink to="/supplies" class="px-6 py-3"> {{$t("menu.supplies")}} </RouterLink> -->
          <!-- <RouterLink to="/settings" class="px-6 py-3 "> {{$t("menu.settings")}} </RouterLink> -->
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>
