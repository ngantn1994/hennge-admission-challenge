<template>
  <div class="mail-container">
    <div v-if="mailList.length > 0">
      <div class="result-number">
        Results: {{mailList.length}} mail(s)
      </div>
      <div class="sort-bar">
        <div v-for="(filter, index) in filters" :key="index"
          :class="{'sort-bar-item': true, 'filter-active': index === activeFilter}">
          {{filter}}
          <ActiveIcon v-if="index === activeFilter" class="active-icon"/>
        </div>
      </div>
      <div class="mail-content-box">
        <MailContent v-for="(mail, index) in mailList" :key="index"
          class="mail-content" :content="mail" :uniqueIndex="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import ActiveIcon from '../assets/icon_arrow01.svg';
import MailContent from './MailContent.vue';

export default {
  name: 'MailContainer',
  components: {
    ActiveIcon,
    MailContent,
  },
  props: {
    mailList: {
      type: Array,
      require: true,
    },
    sortType: {
      type: [Number, String],
      require: false,
    },
  },
  data() {
    return {
      filters: ['From', 'To', 'Subject', 'Date'],
      activeFilter: Number.isInteger(Number(this.sortType)) ? Number(this.sortType) : 0,
    };
  },
};
</script>

<style scoped>
.mail-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
.empty-logo {
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.result-number {
  padding-left: 30px;
  width: calc(100% - 23px);
  height: 30px;
  text-align: left;
  color: #666666;
  font-size: 18px;
  font-weight: bold;
}
.sort-bar {
  width: calc(100% - 20px);
  height: 50px;
  padding-left: 20px;
  text-align: left;
  font-weight: bold;
  font-size: 16px;
  line-height: 50px;
  background-color: #f5f5f5;
  color: #666666;
  border-top: 2px solid #d1d1d1;
  border-bottom: 2px solid #d1d1d1;
}
.sort-bar-item {
  height: 20px;
  padding-right: 10px;
  padding-left: 10px;
  line-height: 20px;
  width: fit-content;
  border-right: 1px solid #000;
  display: inline-block;
}
.filter-active {
  color: #000;
}
.active-icon {
  width: auto;
  height: 7px;
  fill: #000;
  display: inline-block;
  padding-left: 5px;
  padding-bottom: 2px;
}
.mail-content-box {
  width: 100%;
  max-height: 100% - 54px;
  overflow-y: auto;
}
</style>
