import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Markdown from "react-markdown";
import Stats from "../components/stats";

const Content = styled.div``;

const content = `
> This is a [now page](https://sivers.org/nowff).

I am currently employed at [Netlight Consulting](https://www.netlight.com/) as an IT-consultant.
I have been at Bonnier News for a bit over a year now, building parts of their new publishing platform.

My personal focus right now includes nailing a few healthy habits. Specifically I would like to meditate and read everyday, and also workout about 3 times per week. It's weird how I find it so hard to consistently get to it, while knowing how effective they are against anxiety and my overall well-being.
`;

class NowPage extends React.Component {
  render() {
    return (
      <Content>
        <Markdown source={content} />
      </Content>
    );
  }
}

export default NowPage;
