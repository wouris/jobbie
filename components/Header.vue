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
    <div class="grid place-items-center w-1/3" @click="openOverlay">
      <button id="search"
              class="flex justify-between items-center rounded-full w-1/2 px-5 py-2 bg-white/30 text-gray-400">
        <div class="flex items-center">
          <p class="text-xl">Search</p>
          <Icon class="text-2xl" name="material-symbols:arrow-drop-down"/>
        </div>
        <div>
          <KeyboardKey :key-value="'SHIFT'"/>
          +
          <KeyboardKey :key-value="'K'"/>
        </div>
      </button>
    </div>
    <div v-if="showSearch" id="search-overlay"
         class="grid place-items-center background-inversed-transparent overflow-hidden fixed left-0 top-0 w-full backdrop-blur intro-loader"
    >
      <div class="relative w-1/2 h-1/2 grid place-items-center">
        <div class="flex gap-2 items-center w-1/2">
          <div class="flex gap-2 container rounded-xl py-3 px-5">
            <Icon class="text-4xl text-gray-400" name="material-symbols:search"/>
            <input id="autoComplete" v-model="keyword" class="text-2xl bg-transparent text-gray-400 w-full"
                   placeholder="Search..."
                   type="text" @input="filterResults"
            >
          </div>
          <div>
            <button class="flex flex-col items-center container w-fit rounded-md p-2"
                    @click="closeOverlay">
              <Icon class="text-4xl" name="material-symbols:close-rounded"/>
            </button>
          </div>
        </div>
        <ul>
          <li v-for="item in filtered" :key="item.id">
            <NuxtLink to="/">
              {{ item }}
            </NuxtLink>
          </li>
        </ul>
      </div>
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

const items = [
  'java developer',
  'c# developer'
]

export default {
  data() {
    return {
      filtered: [],
      keyword: "",
      hasInput: false,
      showSearch: false,
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

        if (event.key === 'Escape') {
          if (this.showSearch) {
            this.closeOverlay()
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
  },
  computed: {
    filterResults() {
      let tempItems = items;
      if (this.keyword != "" && this.keyword) {
        tempItems = tempItems.filter((item) => {
          return item.toLowerCase().includes(this.keyword.toLowerCase());
        });
        this.filtered = tempItems;
      } else {
        this.filtered = []
      }
    },
  },
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