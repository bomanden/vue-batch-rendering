import { useStreamStore } from "@/stores/streamStore"

export function useStreamEngine() {

  const store = useStreamStore()

  // non-reactive high frequency buffer
  const buffer = new Float32Array(store.streams.length)

  let running = false
  let rafId: number | null = null
  let timer: number | null = null

  function generateData() {
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.random() * 2 - 1
    }
  }

  function updateUI() {
    // copy buffer snapshot to reactive store
    store.setSnapshot(buffer.slice())

    if (running) {
      rafId = requestAnimationFrame(updateUI)
    }
  }

  function start() {

    if (running) return
    running = true

    // high-frequency producer
    timer = setInterval(generateData, 5)

    // UI throttled to screen refresh
    rafId = requestAnimationFrame(updateUI)
  }

  function stop() {

    running = false

    if (timer) clearInterval(timer)
    if (rafId) cancelAnimationFrame(rafId)
  }

  return {
    start,
    stop
  }
}