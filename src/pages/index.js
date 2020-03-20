import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'
import { BaseLayout } from '../layout/baseLayout'
import { Timestamp } from '../components'

const Card = styled.div`
  margin: 1em;
  padding: 2em;
  background: white;
  transition: all 200ms;

  &:hover {
    background: #eee;
  }

  h2 {
    margin-bottom: 0.5em;
  }
`

const IndexPage = props => {
  const posts = get(props, 'data.allMarkdownRemark.edges')

  return (
    <BaseLayout>
      {posts.map(({ node: post }) => (
        <Link key={post.id} to={post.fields.slug}>
          <Card>
            <h2>{post.frontmatter.title}</h2>
            <Timestamp date={post.frontmatter.date} />
          </Card>
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
