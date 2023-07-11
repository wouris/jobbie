<template>
  <kbd
      class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-[#e5e7eb] border border-gray-200 rounded-lg dark:bg-[#26292f] dark:text-gray-100 dark:border-gray-500"
  >
    {{ keyValue }}
  </kbd>
</template>

<script>
export default {
  props: ['keyValue'],
};
</script>