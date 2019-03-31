import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'
import { BaseLayout } from '../layout'
import Post from '../components/post'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const IndexPage = props => {
  const posts = get(props, 'data.allMarkdownRemark.edges')

  return (
    <BaseLayout>
      <Wrapper>
        <div className="posts">
          {posts.map(({ node }) => (
            <Post key={node.fields.slug} {...node} />
          ))}
        </div>
      </Wrapper>
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
          excerpt
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
