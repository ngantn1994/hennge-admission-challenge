<template>
  <div class="date-picker">
    <div class="picker-bar">
      <div class="open-picker">
        <div class="calendar-box">
          <CalendarIcon class="calendar-icon"/>
        </div>
        <div id="date-box" class="date-box" contenteditable="true"
          @keyup.enter="updateSortFilter"></div>
      </div>
      <div class="search-box" @click="updateSortFilter()">
        <SearchIcon class="search-icon"/>
      </div>
    </div>
    <!-- to put the picker box in here later -->
  </div>
</template>

<script>
import CalendarIcon from '../assets/icon_calender.svg';
import SearchIcon from '../assets/icon_search.svg';

const today = new Date();
today.setHours(0, 0, 0, 0);

function getDateFromString(dateStr) {
  const testDate = new Date(dateStr);
  if (testDate instanceof Date && !Number.isNaN(testDate)) {
    if (!Number.isNaN(testDate.getTime())) {
      return testDate;
    }
  }
  return today;
}

function getFormattedDate(date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export default {
  name: 'DatePicker',
  components: {
    CalendarIcon,
    SearchIcon,
  },
  methods: {
    updateSortFilter() {
      const dateBox = document.getElementById('date-box');
      let currentPeriodStr = dateBox.innerText;
      const dates = currentPeriodStr.split('-');
      let newStartDate = new Date(this.$store.getters.getPeriod.startDate);
      let newEndDate = new Date(this.$store.getters.getPeriod.endDate);
      if (dates.length === 2) {
        newStartDate = getDateFromString(dates[0]);
        newEndDate = getDateFromString(dates[1]);

        this.$store.dispatch({
          type: 'updateDatePicker',
          period: {
            startDate: newStartDate,
            endDate: newEndDate,
          },
        });
      }
      currentPeriodStr = `${getFormattedDate(newStartDate)} - ${getFormattedDate(newEndDate)}`;
      dateBox.innerText = currentPeriodStr;
    },
  },
  mounted() {
    this.updateSortFilter();
  },
};
</script>

<style scoped>
.date-picker {
  height: 54px;
  overflow: visible;
}
.picker-bar {
  width: 100%;
  height: 50px;
  border: 2px solid #d1d1d1;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}
.open-picker {
  position: absolute;
  width: calc(100% - 70px);
  height: 100%;
  left: 0px;
  top: 0px;
  box-shadow: 0 0 1px inset #666;
}
.calendar-box {
  height: 100%;
  width: 55px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.calendar-icon {
  width: auto;
  height: 25px;
  fill: #666666;
  position: absolute;
  left: calc(50% + 5px);
  top: 50%;
  transform: translate(-50%, -50%);
}
.date-box {
  width: calc(100% - 68px);
  padding-left: 10px;
  height: 100%;
  line-height: 50px;
  position: absolute;
  left: 55px;
  top: 0px;
  text-align: left;
  font-size: 20px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}
.search-box {
  height: 100%;
  width: 70px;
  position: absolute;
  right: 0px;
  top: 0px;
  background: #f5f5f5;
  border-left: 2px solid #d1d1d1;
  cursor: pointer;
}
.search-icon {
  width: auto;
  height: 25px;
  fill: #666666;
  position: absolute;
  right: calc(50% + 5px);
  top: 50%;
  transform: translate(50%, -50%);
}
</style>
