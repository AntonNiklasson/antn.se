import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import emoji from 'node-emoji'

const Navigation = styled.nav`
  a {
    display: inline-block;
    padding: 0.5em 1em;

    &.active {
      border-bottom: 3px solid ${p => p.theme.link};
    }

    &:hover {
      background: #eee;
    }
  }
`

export function Header() {
  return (
    <div
      css={`
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-between;
        padding: 1em 0;
      `}
    >
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
        <a href="https://antn.se">Notes</a>
        <a href="https://cv.antn.se">Resume</a>
        <Link to="/contact/" activeClassName="active">
          Contact
        </Link>
      </Navigation>
    </div>
  )
}
