<template>
  <div class="home">
    <MailPage msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MailPage from '@/components/MailPage.vue';

export default {
  name: 'Home',
  components: {
    MailPage,
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
