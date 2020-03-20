export const base = {
  transitionDuration: '250ms',
  shadow: 'rgba(0,0,0,0.3)',
}

export const lightTheme = {
  ...base,
  text: '#333',
  textSecondary: '#555',
  background: '#fff',
  border: '#ddd',
  accent: 'orange',
}

export const darkTheme = {
  ...base,
  text: '#EEE',
  textSecondary: '#BBB',
  background: '#061b26',
  border: '#555',
  accent: '#15bf8f',
}

export const breakpoints = {
  small: '800px',
  medium: '1200px',
  large: '1600px',
}
