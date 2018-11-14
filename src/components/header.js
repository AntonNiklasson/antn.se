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

  .inner {
    width: 100%;
    max-width: 50rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    padding: 1em;

    @media (max-width: 600px) {
      flex-direction: column;
      padding: 0 1em;
    }
  }

  h1 {
    font-size: 1.4em;

    a {
      color: inherit;
      font-weight: 300;

      &:hover {
        color: #777;
      }
    }
  }

  .navigations {
    display: flex;
    flex-direction: column-reverse;

    &__secondary {
      color: #888;
      font-size: 0.8em;

      a {
        padding: 0 4px;
        color: inherit;

        &:hover {
          color: #444;
        }
      }
    }

    &__primary {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-flow: row wrap;

      a {
        padding: 8px;
        color: #555;
        border-bottom: 3px solid transparent;

        @media (max-width: 750px) {
          padding: 4px;
        }

        &.active,
        &:hover {
          border-bottom: 3px solid Tomato;
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
  { title: 'CV', url: 'http://cv.antonniklasson.se' },
  { title: 'GitHub', url: 'https://github.com/AntonNiklasson' },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/antonniklasson/' },
  { title: 'Twitter', url: 'https://twitter.com/AntonNiklasson' },
  { title: 'Telegram', url: 'https://t.me/antonniklasson' },
]

const renderLink = ({ url, title, exact = false }) => {
  return (
    <Link exact={exact} to={url} activeClassName="active">
      {title}
    </Link>
  )
}

const Header = () => {
  return (
    <Container>
      <div className="inner">
        <h1>
          <a href="/">Anton Niklasson</a>
        </h1>
        <div className="navigations">
          <nav class="navigations__primary">{primary.map(renderLink)}</nav>
          <nav className="navigations__secondary">
            {secondary.map(renderLink)}
          </nav>
        </div>
      </div>
    </Container>
  )
}

export default Header
