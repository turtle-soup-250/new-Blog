<template>
  <div class="h-auto w-full bg-[#fffefe] relative">
    <div class="w-full fixed top-0 z-[999]">
      <Navbar />
    </div>
    <div class="">
      <RouterView v-slot="{ Component }">
        <KeepAlive include="Home">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style scoped>

</style>
