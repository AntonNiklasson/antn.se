import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import get from 'lodash/get'
import emoji from 'node-emoji'
import { RelativeTimestamp } from '../components/timestamp'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const Post = styled.div`
  margin: 1em 0;
  font-size: 1.3em;

  & a {
    color: #222;
    text-decoration: none;
    transition: all 150ms;

    &:hover {
      color: #555;
    }
  }
`

const IndexPage = props => {
  const posts = get(props, 'data.allMarkdownRemark.edges')

  return (
    <Wrapper>
      <div className="posts">
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <Post key={node.fields.slug}>
              <h3>
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              {/* <small className="date">{node.frontmatter.date}</small> */}
              <RelativeTimestamp date={node.frontmatter.date} />
            </Post>
          )
        })}
      </div>
    </Wrapper>
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
