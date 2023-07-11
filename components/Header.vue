<script setup>
import {useHeaderStore} from "~/store/headerStore";
import ThemeToggler from "~/components/Icon/ThemeToggler.vue";

const Store = useHeaderStore()
</script>

<template>
  <header class="h-32 flex items-center justify-between w-full top-0 p-2">
    <div class="title text-7xl relative flex items-center gap-3">
      <p class="overflow-hidden w-[15%] md:w-full">Jobbie</p>
    </div>
    <div @click="openOverlay">
      <button id="search"
              class="flex justify-between items-center rounded-full px-5 py-2 bg-white/30 text-gray-400">
        <div class="flex items-center">
          <!--                    <Icon class="text-3xl" name="line-md:search"/>-->
          <p class="text-xl">Search</p>
        </div>
        <div>
          <KeyboardKey :key-value="'SHIFT'"/>
          +
          <KeyboardKey :key-value="'K'"/>
        </div>
      </button>
    </div>
    <div v-if="showSearch" id="search-overlay"
         class="background-inversed-transparent overflow-hidden fixed left-0 top-0 w-full backdrop-blur intro-loader"
         @click="closeOverlay">
      <p>cau</p>
    </div>
    <div id="right-items" class="flex items-center overflow-hidden">
      <a>
        <Icon class="text-4xl" name="material-symbols:person"/>
      </a>
      <ThemeToggler/>
    </div>
  </header>
</template>

<script>
import {useHeaderStore} from "~/store/headerStore";

const Store = useHeaderStore()

export default {
  data() {
    return {
      'showSearch': false,
    }
  },
  mounted() {
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
                Store.setShowIcons(false);
              }, 200);
            } else {
              Store.setShowIcons(true);
            }
          }
      );

      let keysPressed = {};

      document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;

        if (keysPressed['Shift'] && event.key === 'K') {
          if (this.showSearch) {
            this.closeOverlay()
          } else {
            this.openOverlay()
          }
        }
      });

      document.addEventListener('keyup', (event) => {
        delete keysPressed[event.key];
      });
    }
  },
  methods: {
    openOverlay() {
      document.body.classList.toggle('overflow-hidden')
      this.showSearch = true
    },
    closeOverlay() {
      const overlay = document.getElementById('search-overlay')
      overlay.classList.toggle('intro-loader')
      overlay.classList.toggle('intro-loader-reversed')

      setTimeout(() => {
        document.body.classList.toggle('overflow-hidden')
        this.showSearch = false
      }, 610)
    }
  }
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
  @apply h-20 delay-[50ms]
}

header .title p {
  transition: width 0.5s cubic-bezier(0.5, 0, 0, 1);
}

header.sticky .title p {
  @apply text-5xl;
}

header #right-items p:nth-child(1) {
  animation-delay: 100ms;
}

header #right-items p:nth-child(2) {
  animation-delay: 200ms;
}

.light header.sticky {
  background-color: white;
  border-bottom: 2px #26292f solid;
}

.dark header.sticky {
  background-color: #26292f;
  border-bottom: 2px white solid;
}

.info:hover .info-text {
  @apply max-w-sm;
  transition: max-width 1s cubic-bezier(0.5, 0, 0, 1);
}
</style>