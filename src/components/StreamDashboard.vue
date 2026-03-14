<script setup lang="ts">
import { useStreamStore } from "@/stores/streamStore"
import { useStreamEngine } from "@/composables/useStreamEngine"

const store = useStreamStore()
const { start, stop } = useStreamEngine()

// pre-computed once — index labels never change
const LABELS = Array.from({ length: 150 }, (_, i) => String(i).padStart(3, '0'))
</script>

<template>

  <div>
    <h2>Realtime Streams</h2>

    <button @click="start">Start</button>
    <button @click="stop">Stop</button>

    <div class="grid">

      <StreamItem
        v-for="(v, i) in store.streams"
        :key="i"
        :label="LABELS[i]"
        :value="v"
      />

    </div>

  </div>

</template>

<style scoped>
.grid{
  display:grid;
  grid-template-columns:repeat(10,1fr);
  gap:6px;
}

</style>
