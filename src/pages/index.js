import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'
import { BaseLayout } from '../layout/baseLayout'
import { Timestamp } from '../components'
//import { Post } from '../components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Grid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`
const PostCard = styled.div`
  padding: 2em;
  background: white;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 0 3px 10px -5px #00000044;
  transition: all 200ms;

  &:hover {
    background: #ececec;
  }

  h2 {
    margin-bottom: 0.5em;
  }
`

const IndexPage = props => {
  const posts = get(props, 'data.allMarkdownRemark.edges')

  return (
    <BaseLayout>
      <Wrapper>
        <Grid>
          {posts.map(({ node: post }) => (
            <Link key={post.id} to={post.fields.slug}>
              <PostCard>
                <h2>{post.frontmatter.title}</h2>
                <Timestamp date={post.frontmatter.date} />
              </PostCard>
            </Link>
          ))}
        </Grid>
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
