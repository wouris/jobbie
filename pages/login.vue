<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'login'
})
</script>

<template>
  <div class="grid place-items-center p-3">
    <form class="w-full" @submit.prevent="loginUser">
      <div class="flex flex-col gap-5 justify-center items-center container text-lg rounded-xl p-5">

        <h1 id="title" class="text-5xl">logIN</h1>
        <div class="flex flex-col w-full">
          <label for="username">Username</label>
          <input id="username"
                 v-model="login.username"
                 class="rounded-xl bg-transparent px-5 py-2 background-inversed-transparent w-full md:w-[80%]"
                 type="text"
          >
        </div>
        <div class="flex flex-col w-full">
          <label class="" for="password">Password</label>
          <input id="password"
                 v-model="login.password"
                 class="rounded-xl bg-transparent px-5 py-2 background-inversed-transparent w-full md:w-[80%]"
                 type="password"
          >
        </div>
        <button id="title" class="text-xl bg-green-500 font-bold p-2 rounded-md w-[80%]">submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async loginUser() {
      const base64code = btoa(this.login.username + ":" + this.login.password)
      const response = await $fetch('http://localhost:8080/auth/login', {
        headers: {
          "Authorization": "Basic " + base64code,
        },
        method: 'POST',
      });
      console.log(response)
    }
  }
}
</script>

<style scoped>

</style>