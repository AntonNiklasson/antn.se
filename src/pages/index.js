import React from 'react'
import { graphql, Link } from 'gatsby'
import { Layout } from '../layout/layout'
import { Timestamp } from '../components'

export default function IndexPage({ data }) {
  const posts = data?.allMdx?.edges ?? []

  return (
    <Layout>
      <section>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {posts.map(({ node: post }) => (
            <div
              key={post.id}
              className="p-4 shadow-sm rounded transition transition-300 hover:shadow-md"
            >
              <Link to={post.fields.slug}>
                <Timestamp date={post.frontmatter.date} />
                <h2 className="text-2xl">{post.frontmatter.title}</h2>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center m-4">
          <a
            href="/notes"
            className="inline-block p-2 text-center transition hover:bg-gray-100"
          >
            Check out all my posts ✍️
          </a>
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 4, sort: { fields: [frontmatter___date], order: DESC }) {
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
