<template>
  <div class="custom-button">
    <button @click="testStore.increment">
      {{ buttonTitle }}
    </button>
    {{ testStore.count }}
  </div>
</template>

<script lang="ts" setup>
import { useTestStore } from '$/stores/testStore'
import { toRef } from 'vue'

const props = defineProps<{
  title: string
  bgcolor: string
}>()

const testStore = useTestStore()

const buttonTitle = toRef(props, 'title')
const buttonColor = toRef(props, 'bgcolor')
</script>

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
