<template>
  <div class="h-auto w-full style-1">
    <div class="h-[8dvh] w-full"></div>
    <div class="h-[30vh] flex justify-center items-center">
      <div
        class="w-[95%] shadow-sm h-[90%] bg-white rounded-2xl border grid grid-cols-1"
      ></div>
    </div>

    <div
      class="h-auto w-full grid px-[2.5%] py-5 gap-5 grid-cols-1 auto-rows-auto md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="p in pageData"
        :key="p.id"
        v-memo="[p.id]"
        class="group relative flex h-[350px] w-full flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-start justify-between">
          <h2 class="text-2xl font-bold text-gray-800 line-clamp-1">
            {{ p.title }}
          </h2>
          <span
            class="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
          >
            {{ p.type }}
          </span>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="it in p.label"
            :key="p.id + '-' + it"
            class="cursor-pointer rounded-lg bg-sky-300 px-3 py-1 text-xs font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
          >
            {{ it }}
          </span>
        </div>
        <p
          class="mt-4 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3"
        >
          {{ p.about }}
        </p>
        <div
          class="mt-6 flex items-center justify-between border-t border-gray-100 pt-4"
        >
          <button
            class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-700 hover:shadow-lg active:scale-95"
            @click="openUrl(p.url)"
          >
            查看详情
            <svg
              class="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
          <span class="text-xs text-gray-400 transition-opacity">
            #{{ p.id }}
          </span>
        </div>
      </div>
    </div>

    <!--分页控件-->
    <div class="flex justify-center items-center gap-3 py-4">
      <button
        @click="currentPage--"
        :disabled="currentPage <= 1"
        class="px-4 py-2 rounded-lg bg-gray-900 text-white disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
      >
        上一页
      </button>
      <span>第 {{ currentPage }} / {{ totalPage }} 页</span>
      <button
        @click="currentPage++"
        :disabled="currentPage >= totalPage"
        class="px-4 py-2 rounded-lg bg-gray-900 text-white disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, computed, ref, onMounted, watch } from "vue";
import { PROJECT_CONTENT } from "../constants/Project";

const allList = shallowRef(PROJECT_CONTENT);
const currentPage = ref(1);
const pageSize = ref(12);

//监听屏幕宽度，动态修改每页条数
const updatePageSize = () => {
  const width = window.innerWidth;
  if(width < 768){
    pageSize.value = 4;
  }else if(width < 1024){
    pageSize.value = 8;
  }else{
    pageSize.value = 12;
  }
  currentPage.value = 1;
};

onMounted(()=>{
  updatePageSize();
  window.addEventListener("resize",updatePageSize);
});

//总页数
const totalPage = computed(()=>{
  return Math.ceil(allList.value.length / pageSize.value);
});

//当前页切片数据
const pageData = computed(()=>{
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return allList.value.slice(start,end);
});

const openUrl = (url) => {
  if (url) {
    window.open(url, "_blank");
  }
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
