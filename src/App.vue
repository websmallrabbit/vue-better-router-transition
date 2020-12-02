<template>
    <div>
      <suspension />
      <vue-better-router-transition :keepAlive="true"></vue-better-router-transition>
    </div>
</template>

<script>
import suspension from './pages/suspension/index'
export default {
  name: 'App',
  components: { suspension }
}
</script>

<style>
*{margin: 0;padding: 0;}
html,body{margin-left:auto;margin-right:auto;position: relative;}
body{background: #f1f1f1;}
</style>
