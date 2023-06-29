<template>
  <div
      :class="[reversed ? 'intro-loader-reversed h-screen bg-green-500 w-full absolute top-0' : 'intro-loader h-[0vh] bg-green-500 w-full absolute bottom-0']"></div>
</template>

<script>
export default {
  props: [
    'reversed'
  ]
}
</script>