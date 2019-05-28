import styled from 'styled-components'

export const MaxWidthContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 2em;

  @media (min-width: 1000px) {
    max-width: 800px;
  }
`
