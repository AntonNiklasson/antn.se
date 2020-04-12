import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { BaseLayout } from './baseLayout'
import { Timestamp } from '../components/timestamp'

require("../prism-tomorrow.css");

const Header = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 1em 0;
  font-size: 1.4em;
  text-align: center;
`
const Content = styled.div`
  max-width: 40em;
  margin: 0 auto;

  .gatsby-resp-image-link {
    max-width: 90%;
    margin: 1em auto;
    box-shadow: 0 10px 7px -8px rgba(0, 0, 0, 0.4);
  }
`

function BlogPostTemplate({ data }) {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    <BaseLayout>
      <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
      <Header>
        <h1>{post.frontmatter.title}</h1>
        <Timestamp date={post.frontmatter.date} />
      </Header>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
      }
    }
  }
`
