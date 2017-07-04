<template>
  <div>
    <router-view></router-view>
    <shopFooter></shopFooter>
  </div>
</template>
<script>
  import shopFooter from './routeView/Footer'
  export default {
    components: {
      'shopFooter': shopFooter
    }
  }
</script>
