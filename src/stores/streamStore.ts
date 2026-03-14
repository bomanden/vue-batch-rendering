import { defineStore } from "pinia"
import { shallowRef } from "vue"

export const useStreamStore = defineStore("streams", () => {

  const streams = shallowRef<Float32Array>(
    new Float32Array(150)
  )

  function setSnapshot(values: Float32Array) {
    streams.value = values
  }

  return {
    streams,
    setSnapshot
  }
})