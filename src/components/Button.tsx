import styled from 'styled-components'

export const Button = styled.button`
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.5em 1em;
  background: ${p => p.theme.accent};
  color: ${p => p.theme.background};
  border: none;
  border-radius: 3px;
  text-transform: uppercase;
  transition: all 200ms;

  &:disabled {
    background: ${p => p.theme.backgroundSecondary};
  }
`
