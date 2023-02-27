<script lang="ts" setup>
import { toRef } from 'vue'
const props = defineProps<{
  title: string
  bgcolor: string
}>()

const buttonTitle = toRef(props, 'title')
const buttonColor = toRef(props, 'bgcolor')

console.log('buttonTitle', buttonTitle.value)
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
  background: v-bind(buttonColor);

  &:hover {
    background: red;
  }
}
</style>
