<script setup lang="ts">
defineProps<{ label: string; value: number }>()

function fmt3(x: number): string {
  const n = Math.round(Math.abs(x) * 1000)
  const i = (n / 1000) | 0
  const f = n % 1000
  return i + '.' + (f < 100 ? (f < 10 ? '00' : '0') : '') + f
}
</script>

<template>
  <div class="stream" :class="value > 0 ? 'positive' : 'negative'">
    {{ label }} : {{ fmt3(value) }}
  </div>
</template>

<style scoped>
.stream {
  padding: 6px;
  font-size: 12px;
  font-family: monospace;
  border: 1px solid #ccc;
  will-change: background-color;
}

.positive { background: #d4ffd4; }
.negative { background: #ffd4d4; }
</style>
