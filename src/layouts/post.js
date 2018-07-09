import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import get from "lodash/get";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 45em;
  margin: 0 auto;
`;
const Header = styled.div`
  padding: 3em 0;
  text-align: center;
  font-size: 1.5em;

  & .date {
    font-size: 0.8em;
  }
`;
const Content = styled.div`
  padding: 1.5em;
  color: #333;

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    line-height: 1.8;
  }
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, "data.site.siteMetadata.title");

    return (
      <Wrapper>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Header>
          <h1>{post.frontmatter.title}</h1>
          <div className="date">{post.frontmatter.date}</div>
        </Header>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Content>
      </Wrapper>
    );
  }
}

export default BlogPostTemplate;

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
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
