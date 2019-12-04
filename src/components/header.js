import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { MaxWidthContainer } from '../components'

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${p => p.theme.background};
  color: ${p => p.theme.text};
  z-index: 1;
  font-size: 0.8em;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(${p => p.theme.background}, transparent);
  }
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
const Navigation = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: bold;

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
    <Container>
      <MaxWidthContainer>
        <InnerContainer>
          <Logo>
            <a href="/">anton</a>
          </Logo>
          <Navigation>
            <a to="https://cv.antn.se">Resume</a>
            <Link to="/contact/" activeClassName="active">
              Contact
            </Link>
          </Navigation>
        </InnerContainer>
      </MaxWidthContainer>
    </Container>
  )
}
