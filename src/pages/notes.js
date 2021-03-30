import React from 'react'
import { graphql, Link } from 'gatsby'
import { Layout } from '../layout/layout'
import { Timestamp } from '../components'

export default function IndexPage({ data }) {
  const posts = data?.allMdx?.edges ?? []

  return (
    <Layout>
      <div className="space-y-8">
        {posts.map(({ node: post }) => (
          <div key={post.id} className="p-4 shadow rounded">
            <Link to={post.fields.slug}>
              <Timestamp date={post.frontmatter.date} />
              <h2 className="text-xl">{post.frontmatter.title}</h2>
            </Link>
          </div>
        ))}
      </div>
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
