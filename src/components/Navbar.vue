<template>
  <div class="h-[8vh] w-full flex justify-between items-center">
    <div class="w-[60%] gap-2 h-[90%] flex justify-evenly items-center px-4">
      <RouterLink
        v-for="cl in HAVBAR_ROUTER_LINK"
        :to="{ name: cl.name }"
        :key="cl.id"
        class="hover:bg-gray-500/10 h-[80%] rounded-lg flex justify-center items-center w-[15%]"
      >
        {{ cl.content }}
      </RouterLink>
    </div>
    <div class="w-[20%] h-full"></div>
  </div>
</template>

<script setup>
import { HAVBAR_ROUTER_LINK } from "../constants/Home";
</script>

<style scoped></style>
