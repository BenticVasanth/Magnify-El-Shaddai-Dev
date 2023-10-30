<template>
  <p class="font-weight-bold digi-label">Enter 6 Digits Code</p>
  <div ref="otpCont">
    <input
      type="text"
      class="digit-box"
      :class="{ bounce: digits[ind] !== null }"
      v-for="(el, ind) in digits"
      :key="el + ind"
      v-model="digits[ind]"
      v-on:keyup.enter="onClickEnter" 
      :autofocus="ind === 0"
      maxlength="1"
      @keydown="handleKeyDown($event, ind)"
    />
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits,onMounted,nextTick  } from "vue";
const props = defineProps({
  default: String,
  digitCount: {
    type: Number,
    required: true,
  },
});
const digits = reactive([]);
if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null;
  }
}
const otpCont = ref(null);
const emit = defineEmits(["update:otp"]);
const isDigitsFull = function () {
  for (const elem of digits) {
    if (elem == null || elem == undefined) {
      return false;
    }
  }
  return true;
};
const handleKeyDown = function (event, index) {
  if (
    event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }
  if (event.key === "Backspace") {
    digits[index] = null;
    if (index != 0) {
      otpCont.value.children[index - 1].focus();
    }
    return;
  }
  if (new RegExp("^([0-9])$").test(event.key)) {
    digits[index] = event.key;
    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus();
    }else{
      setTimeout(() => {
      otpCont.value.children[index].focus();
      }, 0.1);
    }
  }
  if (isDigitsFull()) {
    emit("update:otp", digits.join(""));
  }
};
const onClickEnter = function () {
    if(digits.join("").length == 6){
    emit('onEnterClick', true);
    }
};
onMounted(() => {
    nextTick(() => {
     otpCont.value.children[0].focus();
    });
  });
</script>

<style scoped>
.digit-box {
  border: 1px solid #e8f2ff;
  display: inline-block;
  border-radius: 8px;
  font-size: 16px;
  background: #e8f2ff;
  text-align: center;
}

.digit-box:focus {
  outline: 3px solid #2e68b3;
}
.bounce {
  animation: pulse 0.3s ease-in-out alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}
</style>
