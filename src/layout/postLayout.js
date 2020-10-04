import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { BaseLayout } from './baseLayout'
import { Timestamp } from '../components/timestamp'

require('../prism-tomorrow.css')

const Header = styled.div`
  margin: 0 auto;
  padding: 1em 0 3em 0;
  font-size: 1.4em;
  text-align: center;

  h1 {
    font-size: 70px;
    font-weight: 700;
  }
`
const Content = styled.div`
  max-width: 40em;
  margin: 0 auto;
  padding: 2em;
  background: white;
`

function BlogPostTemplate({ data, ...props }) {
  const {
    mdx: post,
    site: {
      siteMetadata: { title },
    },
  } = data

  return (
    <BaseLayout>
      <Helmet title={`${post.frontmatter.title} | ${title}`} />
      <Header>
        <h1>{post.frontmatter.title}</h1>
        <Timestamp date={post.frontmatter.date} />
      </Header>
      <Content>
        <MDXRenderer>{post.body}</MDXRenderer>
      </Content>
    </BaseLayout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        date
      }
    }
  }
`
