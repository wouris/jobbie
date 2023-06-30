<script setup>
import {useHeaderStore} from "~/store/headerStore";
import SearchReversed from "~/components/Icon/SearchReversed.vue";

const Store = useHeaderStore()
</script>

<template>
  <header class="h-20 flex items-center justify-around w-full top-0 p-2">
    <div class="title text-6xl text-left relative">
      <p class="overflow-hidden w-full">Jobbie</p>
    </div>
    <div class="flex items-center">
      <Icon v-if="Store.showIcons" class="text-3xl" name="line-md:search"/>
      <div :class="!Store.showIcons ? 'hidden' : ''">
        <SearchReversed/>
      </div>
      <button v-if="$colorMode.value === 'light'" @click="$colorMode.preference = 'dark'">
        <Icon class="text-3xl" name="line-md:moon-alt-to-sunny-outline-loop-transition"/>
      </button>
      <button v-else @click="$colorMode.preference = 'light'">
        <Icon class="text-3xl" name="line-md:sunny-outline-to-moon-alt-loop-transition"/>
      </button>
    </div>
  </header>
</template>

<script>
import {useHeaderStore} from "~/store/headerStore";

const Store = useHeaderStore()
if (process.client) {

  let timeout = null;

  window.addEventListener(
      "scroll",
      () => {
        const header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 0);

        if (timeout) {
          clearTimeout(timeout);
        }

        if (window.scrollY === 0) {
          timeout = setTimeout(() => {
            console.log("Delayed execution");
            Store.setShowIcons(false);
          }, 200);
        } else {
          Store.setShowIcons(true);
        }
      }
  );


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

header .title p {
  transition: width 0.5s cubic-bezier(0.5, 0, 0, 1);
}

header.sticky .title p {
  @apply text-5xl w-[18%];
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