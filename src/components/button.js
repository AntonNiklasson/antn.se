import React from 'react'

export function Button({ children }) {
  return (
    <button
      role="button"
      className="my-2 py-1 px-4 bg-blue-900 border-none rounded-sm text-white text-sm font-bold tracking-wider"
    >
      {children}
    </button>
  )
}
