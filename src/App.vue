<template>
  <div class="h-auto w-full bg-[#fffefe] relative">
    <div class="w-full fixed top-0 z-[999]">
      <Navbar />
    </div>
    <div class="">
      <RouterView v-slot="{ Component }">
        <KeepAlive include="Home">
          <Transition 
            name="fade" 
            mode="out-in"
          >
            <component :is="Component" />
          </Transition>
        </KeepAlive>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style scoped>
/* ===== 淡入淡出过渡动画（性能优化版） ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== 性能优化：启用GPU加速 ===== */
.fade-enter-active,
.fade-leave-active {
  will-change: opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* ===== 减少移动端的过渡时间，提升流畅度 ===== */
@media (max-width: 768px) {
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.1s;
  }
}
</style>