<script lang="ts" setup>
import { toRef } from 'vue'

const props = defineProps<{
  title: string
  bgcolor: string
}>()

const buttonTitle = toRef(props, 'title')
const buttonColor = toRef(props, 'bgcolor')
</script>

<template>
  <div class="custom-button">
    <button>
      {{ buttonTitle }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.custom-button {
  margin-top: 30px;
  padding: 30px;
  button {
    background: v-bind(buttonColor);
    border: none;
    padding: 10px;
    border-radius: 5px;
    color: white;
  }
}
</style>
