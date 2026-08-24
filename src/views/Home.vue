<template>
  <div class="h-auto w-full style-1">
    <div class="h-[8vh] w-full"></div>
    <!--开始内容-->
    <div class="h-[90vh] w-full relative flex justify-center items-center">
      <div class="text-center">
        <h1
          class="text-gray-800 text-9xl tracking-wider font-bold select-none cursor-pointer"
          v-once
        >
          Turtle <br />Blog
        </h1>
        <h1 class="text-xl text-gray-800/50 mt-10 font-bold italic" v-once>
          Write down every moment worth remembering
        </h1>
      </div>
      <button
        @click="goMain"
        class="absolute bottom-1 text-sm text-gray-800/50 duration-300 hover:text-gray-800/70"
      >
        点击查看更多内容
      </button>
    </div>
    <!--主要内容-->
    <div class="h-[100vh] w-full flex justify-center items-center relative">
      <div
        class="w-[92%] sm:w-[85%] md:w-[80%] lg:w-[70%] min-h-[60vh] lg:h-[65%] grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 p-4 sm:p-5 absolute z-10 place-items-center"
      >
        <RouterLink
          v-viewport="{ rootMargin: '0px', threshold: 0.3 }"
          :to="{ name: c.name }"
          :key="c.id"
          v-memo="[c.title, c.num, c.content]"
          class="bg-white cursor-pointer border rounded-2xl w-full h-full min-h-[160px] sm:min-h-[180px] lg:h-[66%] shadow-lg duration-200 hover:scale-105 flex justify-center items-center p-4 sm:p-5"
          v-for="c in CARD_CONTENT"
        >
          <div class="text-center">
            <h1 class="text-lg sm:text-xl font-bold text-gray-800">
              {{ c.title }}
            </h1>
            <h1
              class="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-500 mt-4 sm:mt-6 lg:mt-10"
            >
              {{ c.num }}
            </h1>
            <h1
              class="mt-4 sm:mt-6 lg:mt-10 text-gray-800/50 text-sm sm:text-base"
            >
              {{ c.content }}
            </h1>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CARD_CONTENT } from "../constants/Home";
import { useFn } from "../hooks/Home_fn";
const { goMain } = useFn();
</script>

<style scoped></style>
