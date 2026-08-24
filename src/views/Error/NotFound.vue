<template>
  <div
    class="style-1 h-[100vh] w-full flex justify-center items-center relative"
  >
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-800 select-none tracking-wider">
        404
      </h1>
      <h1 class="text-lg text-gray-800/50 mt-8 select-none">
        糟糕！您要找的页面可能已被移走、名称更改，或暂时不可用
      </h1>
      <div class="w-full h-20 mt-8 flex justify-center items-center gap-5 p-3">
        <RouterLink
          :to="{ name: 'Home' }"
          class="h-[90%] w-[90%] bg-sky-200 rounded-xl flex justify-center items-center hover:bg-sky-300"
          >返回主页</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
