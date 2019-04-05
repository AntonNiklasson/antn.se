import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { RelativeTimestamp } from '../components/timestamp'

const Container = styled.div`
  margin: 1em 0;
  font-size: 1.3em;
`

export default function Post({ fields, frontmatter }) {
  return (
    <Container>
      <h2>
        <Link style={{ boxShadow: 'none' }} to={fields.slug}>
          {frontmatter.title}
        </Link>
      </h2>
      <RelativeTimestamp date={frontmatter.date} />
    </Container>
  )
}
