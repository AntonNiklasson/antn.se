import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'
import { BaseLayout } from '../layout/baseLayout'
import { Timestamp } from '../components'

const IndexPage = props => {
  const posts = get(props, 'data.allMarkdownRemark.edges')

  return (
    <BaseLayout>
      {posts.map(({ node: post }) => (
        <Link
          css={`
            display: block;
						margin: 1em 0;
						padding: 1em;
          `}
          key={post.id}
          to={post.fields.slug}
        >
          <h2>{post.frontmatter.title}</h2>
          <Timestamp date={post.frontmatter.date} />
        </Link>
      ))}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
