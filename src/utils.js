export const isClient = () => typeof window !== 'undefined'

export const storage = {
  get(key) {
    if (isClient()) {
      return localStorage.getItem(key)
    }
  },
  set(key, value) {
    if (isClient()) {
      return localStorage.setItem(key, value)
    }
  },
}
