<template>
  <div class="mail-content">
    <div class="mail-meta">
      <div class="sp-mail-icon">
        <MailIcon class="mail-icon"/>
      </div>
      <div class="sender-box" v-html="content.sender"></div>
      <div class="timestamp-box">
        <ClipIcon v-if="content.hasAttachment" class="clip-icon"/>
        <div class="time-string" v-html="getTimestampString()"></div>
        <ArrowIcon class="arrow-icon"/>
      </div>
      <div :id="`recipient-${uniqueIndex}`" class="recipient-box"></div>
      <div v-if="hiddenRecipient > 0" class="hidden-recipient-tag">+{{hiddenRecipient}}</div>
      <div class="title-box" v-html="content.title"></div>
    </div>
  </div>
</template>

<script>
import MailIcon from '../assets/icon_mail_sp.svg';
import ArrowIcon from '../assets/icon_arrow02.svg';
import ClipIcon from '../assets/icon_clip.svg';

function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
}

export default {
  name: 'MailContent',
  components: {
    MailIcon,
    ArrowIcon,
    ClipIcon,
  },
  props: {
    content: {
      type: Object,
      required: true,
      validator(value) {
        return ('sender' in value) && ('recipient' in value) && ('timestamp' in value)
          && ('title' in value) && ('content' in value) && ('hasAttachment' in value);
      },
    },
    uniqueIndex: {
      type: [Number, String],
      required: true,
    },
  },
  methods: {
    getTimestampString() {
      const mailDate = new Date(this.content.timestamp);
      return isToday(mailDate) ? `${mailDate.getHours()}:${mailDate.getMinutes().toString().padStart(2, '0')}`
        : `${mailDate.toLocaleString('default', { month: 'short' })} ${mailDate.getDay()}`;
    },
    updateRecipients() {
      const recipientBox = document.getElementById(`recipient-${this.uniqueIndex}`);
      const boxWidth = Number(getComputedStyle(recipientBox).width.slice(0, -2));
      let currentString = this.content.recipient[0];
      this.hiddenRecipient = this.content.recipient.length - 1;

      const tempElement = document.createElement('span');
      document.body.appendChild(tempElement);

      tempElement.style.font = getComputedStyle(recipientBox).font;
      tempElement.style.fontSize = getComputedStyle(recipientBox).fontSize;
      tempElement.style.height = 'auto';
      tempElement.style.width = 'auto';
      tempElement.style.position = 'absolute';
      tempElement.style.whiteSpace = 'no-wrap';

      /* eslint no-plusplus: 0 */
      for (let index = 1; index < this.content.recipient.length; index++) {
        const newString = `${currentString}, ${this.content.recipient[index]}`;
        tempElement.innerHTML = newString;
        const newTextWidth = tempElement.clientWidth;

        if (newTextWidth < boxWidth) {
          currentString = newString;
          this.hiddenRecipient--;
        } else {
          currentString += ', ...';
          break;
        }
      }

      recipientBox.innerHTML = currentString;
      document.body.removeChild(tempElement);
    },
  },
  data() {
    return {
      hiddenRecipient: 0,
    };
  },
  mounted() {
    this.updateRecipients();
  },
  watch: {
    content() {
      this.updateRecipients();
    },
  },
};
</script>

<style scoped>
.mail-content {
  width: 100%;
  position: relative;
}
.mail-meta {
  width: 100%;
  border-bottom: 2px solid #d1d1d1;
  height: 115px;
  background: #FFF;
}
.sp-mail-icon {
  position: absolute;
  left: 30px;
  top: 20px;
  width: 15px;
  height: auto;
}
.mail-icon {
  width: 15px;
  height: auto;
  fill: #666666;
}
.sender-box {
  width: calc(100% - 150px);
  height: auto;
  position: absolute;
  left: 55px;
  top: 15px;
  color: #000;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.timestamp-box {
  width: auto;
  height: auto;
  position: absolute;
  right: 20px;
  top: 15px;
  color: #000;
}
.clip-icon {
  height: 20px;
  margin-bottom: -5px;
  padding-right: 10px;
  width: auto;
  fill: #666666;
  display: inline-block;
}
.time-string {
  display: inline-block;
}
.arrow-icon {
  height: 8px;
  padding-bottom: 2px;
  padding-left: 5px;
  width: auto;
  fill: #666666;
  display: inline-block;
}
.recipient-box {
  width: calc(100% - 115px);
  height: auto;
  position: absolute;
  left: 55px;
  top: 40px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hidden-recipient-tag {
  color: #FFF;
  background-color: #888888;
  height: fit-content;
  width: fit-content;
  position: absolute;
  right: 20px;
  top: 40px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 5px;
}
.title-box {
  width: calc(100% - 50px);
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  position: absolute;
  left: 30px;
  bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
