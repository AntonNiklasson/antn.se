import React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import { breakpoints } from '../theme'
import { BaseLayout } from '../layout/baseLayout'
import { Timestamp } from '../components'

const GridContainer = styled.div`
  display: grid;
  grid-gap: 1.5em;
  grid-template-columns: 1fr;
  align-items: flex-start;
  transition: all 200ms;

  @media (min-width: ${breakpoints.medium}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: ${breakpoints.large}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const IndexPage = ({ data, ...props }) => {
  const posts = data?.allMdx?.edges ?? []

  return (
    <BaseLayout>
      <GridContainer>
        {posts.map(({ node: post }) => (
          <Link
            key={post.id}
            css={`
              display: block;
              background: ${p => p.theme.background};
              border-radius: 2px;
              padding: 1em;
            `}
            to={post.fields.slug}
          >
            <Timestamp date={post.frontmatter.date} />
            <h2>{post.frontmatter.title}</h2>
          </Link>
        ))}
      </GridContainer>
    </BaseLayout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`
