<template>
  <div class="mail-container">
    <div class="result-number">
      Results: {{mailList.length}} mail(s)
    </div>
    <div class="sort-bar">
      <div v-for="(sort, index) in sorts" :key="index" @click="updateSort(index)"
        :class="{'sort-bar-item': true, 'sort-active': index === activeSort}">
        {{sort}}
        <ActiveIcon v-if="index === activeSort" class="active-icon"/>
      </div>
    </div>
    <div class="mail-content-box">
      <div class="mail-content-long-box">
        <MailContent v-for="(mail, index) in mailList" :key="index"
          class="mail-content" :content="mail" :uniqueIndex="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import ActiveIcon from '../assets/icon_arrow01.svg';
import MailContent from './MailContent.vue';

const SORT_SENDER = 'From';
const SORT_RECIPIENT = 'To';
const SORT_TITLE = 'Subject';
const SORT_DATE = 'Date';

function isInPeriod(dateToCheck, period) {
  if (dateToCheck instanceof Date && !Number.isNaN(dateToCheck)) {
    if (!Number.isNaN(dateToCheck.getTime())) {
      // because the "getTime" function is used to compare,
      // the end date need to be the end of the day
      // which is today + 1 day and no equal
      /* eslint prefer-const: 0 */
      let endDateToCheck = new Date(period.endDate);
      endDateToCheck.setDate(endDateToCheck.getDate() + 1);

      return dateToCheck.getTime() >= period.startDate.getTime()
        && dateToCheck.getTime() < endDateToCheck.getTime();
    }
  }
  return false;
}

export default {
  name: 'MailContainer',
  components: {
    ActiveIcon,
    MailContent,
  },
  props: {
    originalMailList: {
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
      sorts: [SORT_SENDER, SORT_RECIPIENT, SORT_TITLE, SORT_DATE],
      sortProperties: ['sender', 'recipient', 'title', 'timestamp'],
      activeSort: Number.isInteger(Number(this.sortType)) ? Number(this.sortType) : 3,
      mailList: [...this.originalMailList],
    };
  },
  mounted() {
    this.updateSort(this.activeSort);
    this.updateFilter();
  },
  computed: {
    filterStartDate() {
      return this.$store.getters.getPeriod.startDate;
    },
    filterEndDate() {
      return this.$store.getters.getPeriod.endDate;
    },
    period() {
      return {
        startDate: this.filterStartDate,
        endDate: this.filterEndDate,
      };
    },
  },
  methods: {
    updateSort(value) {
      this.activeSort = value;
      const activeProperty = this.sortProperties[this.activeSort];
      const activeSortName = this.sorts[this.activeSort];

      /* eslint no-else-return: 0 */
      if (activeSortName === SORT_DATE) {
        this.mailList.sort(
          (a, b) => {
            const aDate = new Date(a[activeProperty]);
            const bDate = new Date(b[activeProperty]);
            // compare by newest mail first, so the newer the smaller
            if (aDate.getTime() === bDate.getTime()) {
              return 0;
            } else {
              return (aDate.getTime() < bDate.getTime()) ? 1 : -1;
            }
          },
        );
      } else if (activeSortName === SORT_RECIPIENT) {
        // since the recipients are stored in an array
        // for now it'll be sort by the first recipient
        this.mailList.sort(
          (a, b) => {
            const aFirstRecipient = a[activeProperty][0];
            const bFirstRecipient = b[activeProperty][0];

            return aFirstRecipient.toString().localeCompare(bFirstRecipient.toString());
          },
        );
      } else {
        // default: compare the value directly
        this.mailList.sort(
          (a, b) => (a[activeProperty].toString().localeCompare(b[activeProperty].toString())),
        );
      }
    },
    updateFilter() {
      /* eslint function-paren-newline: 0 */
      // in the real case, this might be a call to get the data from server instead
      // if the email list is frequently updated
      this.mailList = this.originalMailList.filter(
        (mail) => (isInPeriod(new Date(mail.timestamp), this.period)));
    },
  },
  watch: {
    filterStartDate() {
      this.updateFilter();
    },
    filterEndDate() {
      this.updateFilter();
    },
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
.sort-active {
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
  max-height: calc(100% - 84px);
  overflow-y: auto;
  position: relative;
}
.mail-content-long-box {
  width: 100%;
  position: relative;
}
</style>
