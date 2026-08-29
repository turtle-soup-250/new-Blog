<template>
  <div class="h-auto w-full style-1">
    <div
      class=""
      style="
        background: linear-gradient(
          90deg,
          transparent 0%,
          transparent 50%,
          rgba(128, 128, 128, 0.45) 100%
        );
      "
    >
      <div class="h-[8vh] w-full"></div>
      <!--开始内容-->
      <div class="h-[92vh] w-full relative flex justify-center items-center">
        <div class="w-[90%] h-[90%] flex justify-center items-center">
          <div class="w-[50%] text-left pt-5 px-14">
            <h1
              class="text-gray-800 text-9xl tracking-wider font-bold select-none cursor-pointer"
            >
              Turtle <br />Blog
            </h1>
            <h1 class="text-xl text-gray-800/50 mt-10 font-bold italic">
              Write down every moment worth remembering
            </h1>
          </div>
          <div class="w-[50%] h-[90%] flex justify-center items-center text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class=" cursor-pointer"
              width="90%"
              height="90%"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <g
                fill="none"
                stroke="currentColor"
                stroke-dasharray="28"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.4s"
                    values="28;0"
                  />
                </path>
                <path
                  stroke-dashoffset="28"
                  d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.4s"
                    dur="0.4s"
                    to="0"
                  />
                </path>
              </g>
            </svg>
          </div>
        </div>
        <button
          @click="goMain"
          class="absolute bottom-5 text-sm text-gray-800/50 duration-300 hover:text-gray-800/70"
        >
          点击查看更多内容
        </button>
      </div>
    </div>
    <!--主要内容-->
    <div class="h-[100vh] w-full flex justify-center items-center relative">
      <div
        class="w-[92%] sm:w-[85%] md:w-[80%] lg:w-[70%] min-h-[60%] lg:h-[65%] grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 p-4 sm:p-5 absolute z-10 place-items-center"
      >
        <RouterLink
          :to="{ name: c.name }"
          :key="c.id"
          v-memo="[c.title, c.num, c.content]"
          class="bg-white/80 cursor-pointer border rounded-3xl w-full h-full min-h-[160px] sm:min-h-[180px] lg:h-[66%] shadow-lg duration-200 hover:scale-105 flex justify-center items-center p-4 sm:p-5"
          v-for="c in CARD_CONTENT"
        >
          <div class="text-center">
            <h1
              class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#06b6d4]"
            >
              {{ c.num }}
            </h1>
            <h1
              class="text-lg sm:text-xl font-bold text-gray-800 mt-2 sm:mt-4 lg:mt-6"
            >
              {{ c.title }}
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
