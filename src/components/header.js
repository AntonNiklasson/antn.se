import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import emoji from 'node-emoji'
import Link from './link'

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #e8e8e8;
  background: white;
  font-family: 'Staatliches', sans-serif;
  padding: 0.5em;

  .inner {
    width: 100%;
    max-width: 50rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;

    @media (max-width: 600px) {
      flex-direction: column;
      padding: 0 1em;
    }
  }

  h1 {
    font-size: 3em;
    line-height: 1.2;

    a {
      color: inherit;
      font-weight: 300;

      &:hover {
        color: #777;
      }
    }
  }

  .navigation {
    &__primary {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-flow: row wrap;
      font-size: 1.2em;

      a {
        padding: 4px;
        color: #777;
        border-bottom: 3px solid transparent;
        position: relative;

        @media (max-width: 750px) {
          padding: 4px;
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: calc(50% - 10px);
          width: 20px;
          height: 4px;
          background: tomato;

          transition: opacity 200ms;
          opacity: 0;
        }

        &:hover,
        &.active {
          color: #333;
        }
        &.active {
          &::after {
            opacity: 1;
          }
        }
      }
    }
    &__secondary {
      color: #888;
      font-size: 1em;

      a {
        padding: 0 4px;
        color: inherit;

        &:hover {
          color: #444;
        }
      }
    }
  }
`

const primary = [
  { title: 'Notes', url: '/', exact: true },
  { title: 'Now', url: '/now' },
]
const secondary = [
  { title: 'GitHub', url: 'https://github.com/AntonNiklasson' },
  { title: 'Twitter', url: 'https://twitter.com/AntonNiklasson' },
  { title: 'Telegram', url: 'https://t.me/antonniklasson' },
  { title: 'Keybase', url: 'https://keybase.io/antonniklasson' },
  { title: 'CV', url: 'http://cv.antonniklasson.se' },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/antonniklasson/' },
]

const renderLink = ({ url, title, exact = false }) => {
  return (
    <Link key={url} exact={exact} to={url} activeClassName="active">
      {title}
    </Link>
  )
}

const Header = () => {
  return (
    <Container>
      <div className="inner">
        <h1>
          <a href="/">Anton</a>
        </h1>
        <nav className="navigation__secondary">{secondary.map(renderLink)}</nav>
        <nav className="navigation__primary">{primary.map(renderLink)}</nav>
      </div>
    </Container>
  )
}

export default Header
