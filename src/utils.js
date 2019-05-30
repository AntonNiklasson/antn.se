export const storage = {
  _disk: {},

  get(key) {
    if (typeof window === 'undefined') {
      return this._disk[key]
    }

    return window.localStorage.getItem(key)
  },

  set(key, value) {
    if (typeof window === 'undefined') {
      this._disk[key] = value
    }

    window.localStorage.setItem(key, value)
  },
}
