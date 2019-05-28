import React from 'react'
import styled from 'styled-components'
import { MaxWidthContainer, Switch } from '../components'

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  z-index: 1;
  box-shadow: 0 0 10px ${p => p.theme.shadow};
  font-size: 0.8em;
`
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em 0;
`
const Logo = styled.h1`
  font-size: 3em;
  color: ${p => p.theme.text};
  transition: color 250ms;

  a {
    color: inherit;
    &:hover {
      color: ${p => p.theme.accent};
    }
  }
`
const ThemeSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5em;
`

export function Header({ toggleTheme, isDarkTheme }) {
  return (
    <Container>
      <MaxWidthContainer>
        <InnerContainer>
          <Logo>
            <a href="/">
              <span>a</span>
              <span>n</span>
              <span>t</span>
              <span>o</span>
              <span>n</span>
              <span>.</span>
            </a>
          </Logo>
          <ThemeSwitchContainer>
            🌞
            <Switch on={isDarkTheme} onToggle={toggleTheme} />
            🌜
          </ThemeSwitchContainer>
        </InnerContainer>
      </MaxWidthContainer>
    </Container>
  )
}
