import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Timestamp } from '../components'

const Container = styled.div`
  margin: 2em 0;
`

export function Post({ fields, frontmatter }) {
  return (
    <Container>
      <h2>
        <Link to={fields.slug}>{frontmatter.title}</Link>
      </h2>
      <Timestamp date={frontmatter.date} />
    </Container>
  )
}
