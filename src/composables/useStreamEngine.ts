import { useStreamStore } from "@/stores/streamStore"

export function useStreamEngine() {

  const store = useStreamStore()
  const size = store.streams.length

  // shared memory: worker writes, main thread reads — zero copy
  const sab     = new SharedArrayBuffer(size * Float32Array.BYTES_PER_ELEMENT)
  const flagSab = new SharedArrayBuffer(4)
  const flag    = new Int32Array(flagSab)

  // point the store at the shared buffer once, use tick() from here on
  store.setSnapshot(new Float32Array(sab))

  const worker = new Worker(
    new URL('../workers/streamWorker.ts', import.meta.url),
    { type: 'module' }
  )
  worker.postMessage({ type: 'init', sab, flagSab })

  let running = false
  let rafId: number | null = null

  function updateUI() {
    // dirty flag: only re-render if worker wrote new data since last frame
    if (Atomics.exchange(flag, 0, 0) === 1) {
      store.tick()
    }
    if (running) rafId = requestAnimationFrame(updateUI)
  }

  function start() {
    if (running) return
    running = true
    worker.postMessage({ type: 'start' })
    rafId = requestAnimationFrame(updateUI)
  }

  function stop() {
    running = false
    worker.postMessage({ type: 'stop' })
    if (rafId) cancelAnimationFrame(rafId)
  }

  return { start, stop }
}
