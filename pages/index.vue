<script setup>
definePageMeta({
  layout: "intro",
});
</script>

<template>
  <div class="grid place-items-center h-screen">
    <div class="flex flex-col gap-2 items-center">
      <h1 id="title" class="text-6xl text-primary title-animation">JObbIE.</h1>
      <h3 class="text-3xl">Turn your hobby into a job!</h3>
      <a id="explore-btn"
         class="border-green-500 rounded-sm border-2 p-2 py flex items-center overflow-hidden relative cursor-pointer"
         @click="redirect">
        <div id="explore-btn-bg" class="absolute bg-green-500 h-full w-full right-0 top-10"></div>
        <span class="text-center slide-in-blurred-left mr-1">Explore</span>
        <Icon class="-rotate-90" name="line-md:arrow-left"/>
      </a>
    </div>
  </div>

  <TransitionSection v-if="showLoader"/>
</template>

<script>
export default {
  data() {
    return {
      "showLoader": false,
    }
  },
  methods: {
    async redirect() {
      this.showLoader = true
      setTimeout(() => {
        navigateTo('/browse')
      }, 600)
    }
  }
}
</script>

<style scoped>
/* General Styles */
#explore-btn-bg {
  transition: top 0.3s cubic-bezier(0.5, 0, 0, 1);
}

#explore-btn:hover #explore-btn-bg {
  @apply top-0
}
</style>