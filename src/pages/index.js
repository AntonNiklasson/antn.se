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
        <NavLink href="/notes">Check out all my notes ✍️</NavLink>
      </Section>

      <Section>
        <SectionTitle>I am currently:</SectionTitle>

        <div
          css={`
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              height: 75px;
              border-radius: 50%;
              max-width: 100%;
              margin-left: 2em;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
          `}
        >
          <div>
            <h3>Writing code at Milkywire 👨‍💻</h3>
            <h4
              css={`
                color: #888;
                font-size: 14px;
              `}
            >
              (as a freelancer)
            </h4>
          </div>
          <img src="data:image/jpeg;base64,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" />
        </div>
        <NavLink href="https://cv.antn.se">My full resume</NavLink>
      </Section>

      <Section
        css={`
          padding: 5em 0;
        `}
      >
        <ContentWrapper>
          <nav
            css={`
              display: flex;
              justify-content: center;

              & > a {
                display: inline-block;
                padding: 0 1em;
              }
            `}
          >
            <a href="https://github.com/AntonNiklasson">GitHub</a>
            <a href="https://www.linkedin.com/in/antonniklasson/">LinkedIn</a>
            <a href="https://www.twitter.com/AntonNiklasson">Twitter</a>
          </nav>
        </ContentWrapper>
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
    allMdx(limit: 3, sort: { fields: [frontmatter___date], order: DESC }) {
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
