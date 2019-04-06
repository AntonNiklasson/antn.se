import React from 'react'
import styled from 'styled-components'
import Switch from '../components/switch'
import { MaxWidthContainer } from './utils'

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
	right: 0;
	padding: .5em;
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  border-bottom: 1px solid ${p => p.theme.border};
	z-index: 1;
	transition: background 250ms, color: 250ms;
`
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Logo = styled.h1`
  font-size: 3em;
  a {
    color: inherit;
  }
`
const ThemeSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5em;
`

export default function Header({ toggleTheme, isDarkTheme }) {
  return (
    <Container>
      <MaxWidthContainer>
        <InnerContainer>
          <Logo>
            <a href="/">
              Ant<span>o</span>n
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
