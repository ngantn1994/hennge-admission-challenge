<template>
  <div class="mail-body">
    <div class="meta-info">
      <div class="back-arrow"></div>
      <div class="back-btn" @click="backToMailPage()">
        Back
      </div>
      <div class="date-box">
        <ClipIcon v-if="content[properties.hasAttachment]" class="clip-icon"/>
        {{content[properties.timestamp]}}
      </div>
      <MailIcon class="mail-icon"/>
      <div class="address-box">
        <div class="sender-box" v-html="content[properties.sender]"></div>
        <div class="recipient-box" v-html="content[properties.recipient].join(', ')"></div>
      </div>
      <div class="title-box">
        {{content[properties.title]}}
      </div>
    </div>
    <div class="body-box">
      {{content[properties.body]}}
    </div>
  </div>
</template>

<script>
import mailProperties from '../data/mailProperties';
import MailIcon from '../assets/icon_mail_sp.svg';
import ClipIcon from '../assets/icon_clip.svg';

export default {
  name: 'MailBody',
  components: {
    MailIcon,
    ClipIcon,
  },
  computed: {
    content() {
      return this.$store.getters.getChosenMail;
    },
    properties() {
      return {
        sender: mailProperties.SENDER,
        recipient: mailProperties.RECIPIENT,
        title: mailProperties.TITLE,
        timestamp: mailProperties.TIMESTAMP,
        body: mailProperties.BODY,
        hasAttachment: mailProperties.HAS_ATTACHMENT,
      };
    },
  },
  methods: {
    backToMailPage() {
      this.$router.push({
        name: 'Home',
      });
    },
  },
};
</script>

<style scoped>
.mail-body {
  width: 100%;
}
.meta-info {
  width: calc(100% - 60px);
  padding: 30px;
  padding-top: 60px;
  background-color: #f5f5f5;
  color: #000;
  border-bottom: 2px solid #d1d1d1;
}
.back-btn {
  background-color: #666666;
  color: #FFF;
  height: 30px;
  line-height: 30px;
  width: 70px;
  position: absolute;
  top: 10px;
  left: 45px;
  text-align: center;
  font-weight: bold;
}
.back-arrow {
  border: 15px solid transparent;
  border-right-color: #666666;
  display: block;
  width: 0px;
  height: 0px;
  position: absolute;
  top: 10px;
  left: 15px;
}
.clip-icon {
  height: 20px;
  margin-bottom: -5px;
  padding-right: 10px;
  width: auto;
  fill: #666666;
  display: inline-block;
}
.date-box {
  width: fit-content;
  position: absolute;
  right: 30px;
  top: 40px;
}
.mail-icon {
  width: 20px;
  height: auto;
  fill: #666666;
  float: left;
  padding-top: 5px;
}
.address-box {
  width: calc(100% - 90px);
  margin-left: 10px;
  float: left;
}
.recipient-box {
  padding-top: 18px;
}
.title-box {
  padding-top: 20px;
  clear: both;
  font-size: 20px;
  font-weight: bold;
}
.body-box {
  width: calc(100% - 60px);
  padding: 30px;
  text-align: justify;
}
</style>
