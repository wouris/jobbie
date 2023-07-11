<template>
  <button v-if="$colorMode.value === 'light'" @click="$colorMode.preference = 'dark'">
    <Icon class="text-4xl" name="line-md:moon-alt-to-sunny-outline-loop-transition"/>
  </button>
  <button v-else @click="$colorMode.preference = 'light'">
    <Icon class="text-4xl" name="line-md:sunny-outline-to-moon-alt-loop-transition"/>
  </button>
</template>