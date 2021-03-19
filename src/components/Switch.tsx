import React from 'react'
import styled from 'styled-components'

const Container = styled.div``
const Track = styled.div`
  width: 2.5em;
  height: 1.3em;
  background: ${p => p.theme.background};
  border: 1px solid ${p => p.theme.border};
  border-radius: 1em;
  position: relative;
  transition: background 250ms;

  &:hover {
    background: ${p => p.theme.backgroundSecondary};
  }
`
const Knob = styled.div`
  background: ${p => p.theme.accent};
  width: 1em;
  height: 1em;
  border-radius: 1em;
  transition: all 250ms;
  position: absolute;
  top: 0.1em;
  left: ${p => (p.on ? 'calc(100% - 1.1em)' : '.1em')};
`

export function Switch({ on, onToggle }) {
  return (
    <Container onClick={onToggle}>
      <Track on={on}>
        <Knob on={on} />
      </Track>
    </Container>
  )
}
