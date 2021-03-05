<template>
  <div class="mail">
    <MailBody/>
  </div>
</template>

<script>
import MailBody from '@/components/MailBody.vue';

export default {
  name: 'Mail',
  components: {
    MailBody,
  },
};
</script>

<style scoped>
.mail {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
