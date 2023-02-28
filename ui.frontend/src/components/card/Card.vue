<template>
  <div class="card">
    <div class="label">{{ cardLabel ? cardLabel : 'label' }}</div>
    <div class="description">
      {{ cardDescription ? cardDescription : 'description' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'

const props = defineProps<{
  label: string | undefined
  description: string | undefined
}>()

const cardLabel = toRef(props, 'label')
const cardDescription = toRef(props, 'description')
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
}
.label {
  padding: 10px;
}
.description {
  padding: 10px;
}
</style>
