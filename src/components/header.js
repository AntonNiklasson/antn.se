import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import emoji from 'node-emoji'

const HeaderContainer = styled.header`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 2em 0;
  color: ${p => p.theme.text};
`
const Navigation = styled.nav`
  a {
    display: inline-block;
    padding: 0.5em;
    color: ${p => p.theme.text};

    &:hover {
      color: ${p => p.theme.linkHover};
    }

    &.active {
      border-bottom: 3px solid ${p => p.theme.link};
    }
  }
`

export function Header() {
  return (
    <HeaderContainer>
      <h1>
        <a
          href="/"
          css={`
            color: ${p => p.theme.text};
            font-size: 1em;
            font-weight: bold;

            &:hover {
              color: #aaa;
            }
          `}
        >
          anton niklasson
        </a>
      </h1>
      <Navigation>
        <a href="https://cv.antn.se">Resume</a>
        <Link to="/">Notes</Link>
        <Link to="/photos">Photos</Link>
        <Link to="/contact/">Contact</Link>
      </Navigation>
    </HeaderContainer>
  )
}
