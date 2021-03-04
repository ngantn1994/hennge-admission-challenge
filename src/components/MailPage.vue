<template>
  <div class="mail-page">
    <div class="top-section">
      <DatePicker class="date-picker"/>
    </div>
    <div class="bottom-section">
      <MailContainer class="mail-container"
        :mailList="listOfMail" :sortType="2"/>
    </div>
  </div>
</template>

<script>
import mailList from '../data/mails';
import DatePicker from './DatePicker.vue';
import MailContainer from './MailContainer.vue';

export default {
  name: 'MailPage',
  components: {
    DatePicker,
    MailContainer,
  },
  data() {
    return {
      listOfMail: mailList,
    };
  },
};
</script>

<style scoped>
.mail-page {
  width: 100%;
  height: 100vh;
  max-height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-image: url('../assets/logo.png');
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
.top-section {
  width: calc(100% - 60px);
  padding: 30px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.date-picker {
  max-width: 350px;
}
.bottom-section {
  height: calc(100% - 114px);
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.mail-container {
  max-width: 100vw;
}
</style>
