let buf: Float32Array
let flag: Int32Array
let timer: ReturnType<typeof setInterval> | null = null

// xorshift32 — ~3x faster than Math.random for bulk generation
let seed = 0xdeadbeef
function rand(): number {
  seed ^= seed << 13
  seed ^= seed >>> 17
  seed ^= seed << 5
  return (seed >>> 0) / 0xffffffff
}

self.onmessage = (e: MessageEvent) => {
  const { type } = e.data

  if (type === 'init') {
    buf  = new Float32Array(e.data.sab)
    flag = new Int32Array(e.data.flagSab)

  } else if (type === 'start') {
    timer = setInterval(() => {
      for (let i = 0; i < buf.length; i++) {
        buf[i] = rand() * 2 - 1
      }
      // signal main thread: new data ready
      Atomics.store(flag, 0, 1)
    }, 5)

  } else if (type === 'stop') {
    if (timer !== null) { clearInterval(timer); timer = null }
  }
}
