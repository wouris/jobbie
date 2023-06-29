<template>
<div class="container rounded ml-1 p-3">
    <p class="text-3xl text-primary">{{ data.title }}</p>
    <p class="font-bold">{{ data.company }}</p>
    <p class="flex items-center"><Icon name="material-symbols:location-on-outline"/>{{ data.location }}</p>
</div>
</template>

<script>
export default {
  props: [
    'data'
  ]
}
</script>