<template>
  <div class="mail-content">
    <div class="mail-meta" @click="toggleMailBody()">
      <div class="sp-mail-icon sp-only">
        <MailIcon class="mail-icon"/>
      </div>
      <div :class="{'sender-box': true, 'sort-column': sortIndex === 0}"
        v-html="content[properties.sender]"></div>
      <ClipIcon v-if="content[properties.hasAttachment]" class="clip-icon pc-only"/>
      <div :class="{'timestamp-box': true, 'sort-column': sortIndex === 3}">
        <ClipIcon v-if="content[properties.hasAttachment]" class="clip-icon-sp sp-only"/>
        <div class="time-string" v-html="getTimestampString()"></div>
        <ArrowIcon class="arrow-icon"/>
      </div>
      <div :id="`recipient-${uniqueIndex}`"
        :class="{'recipient-box': true, 'sort-column': sortIndex === 1}"></div>
      <div v-if="hiddenRecipient > 0" class="hidden-recipient-tag">
        +{{hiddenRecipient}}
      </div>
      <div :class="{'title-box': true, 'sort-column': sortIndex === 2}"
        v-html="content[properties.title]"></div>
    </div>
    <div :class="{'mail-body': true, 'mail-body-show': isShowingBody}">
      {{content[properties.body]}}
      <div v-show="isShowingBody" class="mail-body-more">
        <div class="mail-body-more-btn" @click="viewFullEmail()">
          View full email
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mailProperties from '../data/mailProperties';
import MailIcon from '../assets/icon_mail_sp.svg';
import ArrowIcon from '../assets/icon_arrow02.svg';
import ClipIcon from '../assets/icon_clip.svg';

function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
}

function isThisYear(date) {
  const today = new Date();
  return date.getFullYear() === today.getFullYear();
}

function getFormattedDate(date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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
        const properties = Object.values(mailProperties);
        for (let index = 0; index < properties.length; index += 1) {
          if (!(properties[index] in value)) {
            return false;
          }
        }
        return true;
      },
    },
    uniqueIndex: {
      type: [Number, String],
      required: true,
    },
    sortIndex: {
      type: [Number, String],
      required: true,
    },
  },
  methods: {
    getTimestampString() {
      const mailDate = new Date(this.content[this.properties.timestamp]);
      /* eslint no-else-return: 0 */
      if (isToday(mailDate)) {
        return `${mailDate.getHours()}:${mailDate.getMinutes().toString().padStart(2, '0')}`;
      } else if (isThisYear(mailDate)) {
        return `${mailDate.toLocaleString('default', { month: 'short' })} ${mailDate.getDate()}`;
      }

      return getFormattedDate(mailDate);
    },
    updateRecipients() {
      const recipientBox = document.getElementById(`recipient-${this.uniqueIndex}`);
      const boxWidth = Number(getComputedStyle(recipientBox).width.slice(0, -2));
      let currentString = this.content[this.properties.recipient][0];
      this.hiddenRecipient = this.content[this.properties.recipient].length - 1;

      const tempElement = document.createElement('span');
      document.body.appendChild(tempElement);

      tempElement.style.font = getComputedStyle(recipientBox).font;
      tempElement.style.fontSize = getComputedStyle(recipientBox).fontSize;
      tempElement.style.height = 'auto';
      tempElement.style.width = 'auto';
      tempElement.style.position = 'absolute';
      tempElement.style.whiteSpace = 'no-wrap';

      /* eslint no-plusplus: 0 */
      for (let index = 1; index < this.content[this.properties.recipient].length; index++) {
        const newString = `${currentString}, ${this.content[this.properties.recipient][index]}`;
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
    toggleMailBody() {
      this.isShowingBody = !this.isShowingBody;
    },
    viewFullEmail() {
      this.$store.dispatch({
        type: 'updateChosenMail',
        mail: this.content,
      });
      this.$router.push({
        name: 'Mail',
      });
    },
  },
  data() {
    return {
      hiddenRecipient: 0,
      isShowingBody: false,
    };
  },
  computed: {
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
  created() {
    window.addEventListener('resize', this.updateRecipients);
  },
  destroyed() {
    window.removeEventListener('resize', this.updateRecipients);
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
.sp-only {
  display: block;
}
.pc-only {
  display: none;
}
.mail-content {
  width: 100%;
  position: relative;
  color: #000;
}
.mail-meta {
  width: 100%;
  border-bottom: 2px solid #d1d1d1;
  height: 115px;
  background: #FFF;
  position: relative;
  cursor: pointer;
}
.mail-body {
  width: calc(100% - 60px);
  padding-left: 30px;
  padding-right: 30px;
  border-bottom: 0px solid #d1d1d1;
  height: 0px;
  background: #FFF;
  color: rgba(0, 0, 0, 0);
  position: relative;
  transition: 200ms height ease-in-out, 200ms color ease-in-out, 200ms padding-top ease-in-out;
  font-size: 0px;
}
.mail-body-show {
  border-bottom: 2px solid #d1d1d1;
  height: 160px;
  padding-top: 20px;
  padding-bottom: 20px;
  color: rgba(0, 0, 0, 100);
  overflow: hidden;
  text-align: justify;
  font-size: 18px;
}
.mail-body-more {
  background-color: #FFF;
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0px;
  right: 0px;
}
.mail-body-more-btn {
  background-color: #888888;
  color: #FFF;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  width: fit-content;
  height: fit-content;
  position: absolute;
  bottom: 5px;
  right: 30px;
  cursor: pointer;
  border-radius: 5px;
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
.sort-column {
  font-weight: bold;
}
.sender-box {
  width: calc(100% - 150px);
  height: auto;
  position: absolute;
  left: 55px;
  top: 15px;
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
}
.clip-icon {
  height: 20px;
  width: auto;
  fill: #666666;
  position: absolute;
  right: 100px;
  top: 15px;
}
.clip-icon-sp {
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
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .sp-only {
    display: none;
  }
  .pc-only {
    display: block;
  }
  .mail-meta {
    height: 50px;
  }
  .sender-box {
    width: calc((100% - 20px)/100*20 - 10px);
    height: 50px;
    line-height: 50px;
    left: 20px;
    top: 0px;
    font-size: 20px;
  }
  .recipient-box {
    width: calc((100% - 20px)/100*25 - 50px);
    height: 50px;
    line-height: 50px;
    left: calc((100% - 20px)/100*20 + 20px);
    top: 0px;
    font-size: 20px;
  }
  .hidden-recipient-tag {
    right: calc((100% - 20px)/100*55 + 10px);
    top: 15px;
  }
  .title-box {
    width: calc((100% - 20px)/100*40 - 30px);
    height: 50px;
    line-height: 50px;
    left: calc((100% - 20px)/100*45 + 20px);
    top: 0px;
  }
  .clip-icon {
    right: calc((100% - 20px)/100*15 + 10px);
  }
  .timestamp-box {
    width: calc((100% - 20px)/100*15 - 10px);
    height: 50px;
    line-height: 50px;
    left: calc((100% - 20px)/100*85 + 20px);
    top: 0px;
    font-size: 20px;
  }
  .mail-meta:hover {
    color: blue;
  }
  .mail-meta:hover .clip-icon {
    filter: sepia(100%) hue-rotate(190deg) saturate(500%);
  }
  .mail-meta:hover .hidden-recipient-tag {
    background-color: blue;
  }
  .mail-body {
    width: calc(100% - 40px);
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
