<template>
  <div>

  </div>
</template>
<script>
export default {
  beforeRouteLeave (to, from, next) {
    to.meta.keepAlive = true
    next()
  }
}
</script>
