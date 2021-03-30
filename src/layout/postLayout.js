import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Layout } from './layout'
import { Timestamp } from '../components/timestamp'

require('../prism-tomorrow.css')

function BlogPostTemplate({ data }) {
  const {
    mdx: post,
    site: {
      siteMetadata: { title },
    },
  } = data

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | ${title}`} />
      <header className="text-center py-8">
        <h1 className="text-4xl mb-4 tracking-tight">
          {post.frontmatter.title}
        </h1>
        <Timestamp date={post.frontmatter.date} />
      </header>
      <div className="prose pb-16">
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
    </Layout>
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
