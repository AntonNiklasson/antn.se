import React from "react";
import Link from "gatsby-link";
import moment from "moment";
import get from "lodash/get";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .posts {
    margin: 2em 0;
  }
`;
const Post = styled.div`
  margin: 0.5em 0;
  padding: 0.5em 0;
  font-size: 2em;

  & .date {
    font-size: 0.7em;
    color: #555;
  }

  & a {
    color: #222;
    text-decoration: none;
    transition: all 150ms;

    &:hover {
      color: #0071b7;
    }
  }
`;

class IndexPage extends React.Component {
  render() {
    const posts = get(this, "props.data.allMarkdownRemark.edges");

    return (
      <Wrapper>
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
