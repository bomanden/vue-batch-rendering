import { defineStore } from "pinia"
import { shallowRef, triggerRef } from "vue"

export const useStreamStore = defineStore("streams", () => {

  const streams = shallowRef<Float32Array>(
    new Float32Array(1500)
  )

  function setSnapshot(values: Float32Array) {
    streams.value = values
  }

  // force re-render without replacing the reference (used with SharedArrayBuffer)
  function tick() {
    triggerRef(streams)
  }

  return {
    streams,
    setSnapshot,
    tick
  }
})