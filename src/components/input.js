import React from 'react'

export function Input({ multiline = false, ...props }) {
  const classes = ['p-2 resize-none border rounded', multiline && 'h-32']
    .filter(Boolean)
    .join(' ')

  return multiline ? (
    <textarea className={classes} {...props} />
  ) : (
    <input className={classes} {...props} />
  )
}
