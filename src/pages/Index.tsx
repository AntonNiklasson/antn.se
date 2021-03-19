import React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import { mediaQueries } from '../theme'
import { Layout, ContentWrapper } from '../layout/layout'
import { Timestamp } from '../components'

const Section = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 2em 0;
  background: white;

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`
const SectionTitle = styled.h2`
  margin: 1em 0;
  text-align: center;
  font-size: 14px;
  text-transform: uppercase;
`
const NavLink = styled.a`
  display: inline-block;
  margin: 1em 0;
  padding: 1em;
  font-weight: normal;

  &:hover {
    background: #eaeaea;
  }
`

export default function IndexPage({ data, ...props }) {
  const posts = data?.allMdx?.edges ?? []

  return (
    <Layout fullWidth>
      <Section>
        <SectionTitle>Latest posts:</SectionTitle>
        <div
          css={`
            display: grid;
            grid-gap: 1em;
            grid-template-columns: 1fr;
            padding: 0 2em;

            ${mediaQueries.medium} {
              grid-template-columns: 1fr 1fr 1fr;
            }
            ${mediaQueries.large} {
              padding: 0 10em;
            }
          `}
        >
          {posts.map(({ node: post }) => (
            <Link
              key={post.id}
              to={post.fields.slug}
              css={`
                padding: 1em;
                border-top: 2px solid transparent;
                &:hover {
                  border-color: #ddd;
                  background: #ededed;
                }
              `}
            >
              <Timestamp date={post.frontmatter.date} />
              <h2>{post.frontmatter.title}</h2>
            </Link>
          ))}
        </div>
        <NavLink href="/notes">Check out all my posts ✍️</NavLink>
      </Section>
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
    allMdx(limit: 6, sort: { fields: [frontmatter___date], order: DESC }) {
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
