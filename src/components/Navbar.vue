<template>
  <div class="h-[8vh] w-full flex justify-between items-center">
    <div class="w-[60%] gap-2 h-[90%] flex justify-evenly items-center px-4">
      <RouterLink
        v-for="cl in HAVBAR_ROUTER_LINK"
        :to="{ name: cl.name }"
        :key="cl.id"
        class="hover:bg-gray-500/25 text-gray-600 hover:text-gray-800 duration-200 h-[70%] rounded-lg flex justify-center items-center w-[15%]"
      >
        {{ cl.content }}
      </RouterLink>
    </div>
    <div class="w-[20%] h-full flex justify-center items-center gap-3">
      <button @click="goTop" class="h-[60%] text-gray-800 text-3xl rounded-xl aspect-square duration-200 hover:bg-gray-500/10 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="currentColor"
            d="M15.5 14.5a.74.74 0 0 1-.53-.22l-3-3l-3 3A.75.75 0 0 1 8 13.22l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.56.22"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { HAVBAR_ROUTER_LINK } from "../constants/Home";
import { useFn } from "../hooks/Home_fn";
const { goTop } = useFn();
</script>

<style scoped></style>
