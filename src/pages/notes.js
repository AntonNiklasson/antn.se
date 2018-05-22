import React from "react";
import Link from "gatsby-link";
import moment from "moment";
import get from "lodash/get";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  & header {
    padding: 3em 0;
  }
`;
const Links = styled.nav``;
const Post = styled.div`
  margin: 0.5em 0;
  padding: 0.5em 0;
  font-size: 1.2em;

  & .date {
    font-size: 0.7em;
    color: #AAA;
  }

  & a {
    color: white;
    text-decoration: none;
    transition: all 300ms;

    &:hover {
      color: #c9d262;
    }
  }
`;

class IndexPage extends React.Component {
  render() {
    const posts = get(this, "props.data.allMarkdownRemark.edges");

    return (
      <Wrapper>
        <header>
          <h1>antonniklasson.se/notes</h1>
        </header>

        <div className="posts">
          {posts.map(({ node }) => {
            const title = get(node, "frontmatter.title") || node.fields.slug;
            return (
              <Post key={node.fields.slug}>
                <h3>
                  <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small className="date">{node.frontmatter.date}</small>
              </Post>
            );
          })}
        </div>
      </Wrapper>
    );
  }
}

export default IndexPage;

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
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`;
