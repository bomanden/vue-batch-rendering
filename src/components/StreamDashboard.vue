<script setup lang="ts">
import { useStreamStore } from "@/stores/streamStore"
import { useStreamEngine } from "@/composables/useStreamEngine"

const store = useStreamStore()
const { start, stop } = useStreamEngine()

// pre-computed once — index labels never change
const LABELS = Array.from({ length: 150 }, (_, i) => String(i).padStart(3, '0'))

// faster than toFixed: avoids locale-aware formatting
function fmt3(x: number): string {
  const n = Math.round(Math.abs(x) * 1000)
  const i = (n / 1000) | 0
  const f = n % 1000
  return i + '.' + (f < 100 ? (f < 10 ? '00' : '0') : '') + f
}
</script>

<template>

  <div>
    <h2>Realtime Streams</h2>

    <button @click="start">Start</button>
    <button @click="stop">Stop</button>

    <div class="grid">

      <div
        v-for="(v, i) in store.streams"
        :key="i"
        class="stream"
        :class="v > 0 ? 'positive' : 'negative' "
      >
        {{ LABELS[i] }} : {{ fmt3(v) }}
      </div>

    </div>

  </div>

</template>

<style scoped>
.grid{
  display:grid;
  grid-template-columns:repeat(10,1fr);
  gap:6px;
}

.stream{
  padding:6px;
  font-size:12px;
  font-family: monospace;
  border:1px solid #ccc;
  will-change: background-color;
}

.positive { background: #d4ffd4; }
.negative { background: #ffd4d4; }
</style>
