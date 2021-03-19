export const base = {
  transitionDuration: '250ms',
  shadow: 'rgba(0,0,0,0.3)',
}

export const theme = {
  ...base,
  text: '#333',
  textSecondary: 'white',
  background: 'white',
  backgroundSecondary: '#222',
  backgroundWarning: '#f7f7ed',
  border: '#ddd',
  accent: '#9068b9',
  link: '#333',
  linkHover: '#9068b9',
}

const breakpoints = [800, 1400]

export const mediaQueries = {
  small: `@media only screen and (max-width: ${breakpoints[0]}px)`,
  medium: `@media only screen and (min-width: ${breakpoints[0]}px)`,
  large: `@media only screen and (min-width: ${breakpoints[1]}px)`,
}
