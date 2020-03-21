import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import emoji from 'node-emoji'

const Navigation = styled.nav`
  a {
    display: inline-block;
    margin: 0 1em;

    &.active {
      border-bottom: 3px solid ${p => p.theme.accent};
    }
  }
`

export function Header() {
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1em 0;
      `}
    >
      <h1>
        <a
          href="/"
          css={`
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
        <Link to="/contact/" activeClassName="active">
          Contact
        </Link>
      </Navigation>
    </div>
  )
}
