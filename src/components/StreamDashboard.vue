<script setup lang="ts">
import { useStreamStore } from "@/stores/streamStore"
import { useStreamEngine } from "@/composables/useStreamEngine"

const store = useStreamStore()
const { start, stop } = useStreamEngine()
</script>

<template>

  <div>
    <h2>Realtime Streams</h2>

    <button @click="start">Start</button>
    <button @click="stop">Stop</button>

    <div class="grid">

      <div
        v-for="(v,i) in store.streams"
        :key="i"
        class="stream"
        :style="{
          background: v > 0 ? '#d4ffd4' : '#ffd4d4'
        }"
      >
        {{ i }} : {{ v.toFixed(3) }}
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
  border:1px solid #ccc;
}
</style>