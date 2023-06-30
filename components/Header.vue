<script setup>
import {useHeaderStore} from "~/store/headerStore";

const Store = useHeaderStore()
</script>

<template>
  <header class="h-20 flex items-center justify-around w-full top-0 p-2">
    <div class="title text-6xl text-left relative">
      <!--      <p v-if="Store.showIcons" class="w-full">J</p>-->
      <p class="overflow-hidden w-full">Jobbie</p>
    </div>
  </header>
</template>

<script>
import {useHeaderStore} from "~/store/headerStore";

const Store = useHeaderStore()
if (process.client) {

  let timeout = null

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0)
    if (!timeout) {
      timeout = setTimeout(() => {
        Store.showIcons = window.scrollY > 0
        timeout = null
      }, 500)
    }
  })
}
</script>


<style scoped>

.title > p {
  font-family: "Major Mono Display", monospace;
}

header {
  transition-property: height, padding, background-color, border-bottom;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
}

header.sticky {
  height: 60px;
  transition-delay: 50ms;
}

header.sticky .title p {
  transition-property: width, transform;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
  transition-delay: 0ms, 500ms;
}

header .title p {
  transition-property: width, transform;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
  transition-delay: 500ms, 0ms;
}

header.sticky .title p {
  @apply text-5xl w-[18%];
  transform: translateX(85px);
}

.light header.sticky {
  background-color: white;
  border-bottom: 2px #26292f solid;
}

.dark header.sticky {
  background-color: #26292f;
  border-bottom: 2px white solid;
}
</style>