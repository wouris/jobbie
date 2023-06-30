<script setup>
import {useLoaderStore} from '~/store/loaderStore';

const store = useLoaderStore()

definePageMeta({
  middleware: 'loader',
})
</script>

<template>
  <!--  remove h-120vh later-->
  <div class="flex flex-col rounded-xl gap-4 w-full h-[120vh]">
    <div v-for="job in jobData" class="flex flex-col gap-2 bg-green-500 rounded-xl">
      <JobCard :data=job></JobCard>
    </div>
  </div>
  <TransitionSection v-if="store.shouldShowLoader" :reversed="true"/>
</template>

<script>
export default {
  data() {
    return {
      "jobData": [
        {
          "title": "C# developer",
          "company": "Siemens Slovensko",
          "location": "Košice, Slovensko"
        },
        {
          "title": "Junior Java Engineer",
          "company": "Swiss Re",
          "location": "Bratislava, Slovensko"
        },
      ]
    }
  }
}
</script>