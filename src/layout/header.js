import React from 'react'
import styled from 'styled-components'
import Link from '../components/link'
import Switch from '../components/switch'
import { MaxWidthContainer } from './utils'

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  border-bottom: 1px solid ${p => p.theme.border};
	z-index: 1;
	transition-property: background, border-color, color;
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
const Navigation = styled.nav`
  font-size: 1.5em;
	font-family: 'VT323', monospace;

	& > * {
		margin: 0 .2em;
	}

  & .active {
    border-bottom: 3px solid ${p => p.theme.accent};
  }
`
const ThemeSwitchContainer = styled.div`
  display: flex;
  align-items: center;
`

/*
const secondary = [
  { title: 'GitHub', url: 'https://github.com/AntonNiklasson' },
  { title: 'Twitter', url: 'https://twitter.com/AntonNiklasson' },
  { title: 'Telegram', url: 'https://t.me/antonniklasson' },
  { title: 'Keybase', url: 'https://keybase.io/antonniklasson' },
  { title: 'CV', url: 'http://cv.antonniklasson.se' },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/antonniklasson/' },
]
*/

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
          <Navigation>
            <Link to="/" activeClassName="active">
              Notes
            </Link>
            <Link to="/now" exact activeClassName="active">
              Now
            </Link>
          </Navigation>
        </InnerContainer>
      </MaxWidthContainer>
    </Container>
  )
}
