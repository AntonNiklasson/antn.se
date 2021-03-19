import React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import { mediaQueries } from '../theme'
import { Layout } from '../layout/layout'
import { Timestamp } from '../components'

const GridContainer = styled.div`
  display: grid;
  grid-gap: 1.5em;
  grid-template-columns: 1fr;
  align-items: flex-start;
  transition: all 200ms;

  ${mediaQueries.medium} {
    grid-template-columns: 1fr 1fr;
  }
  ${mediaQueries.large} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export default function IndexPage({ data }) {
  const posts = data?.allMdx?.edges ?? []

  return (
    <Layout>
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
    </Layout>
  )
}

export const pageQuery = graphql`
  query Query {
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
