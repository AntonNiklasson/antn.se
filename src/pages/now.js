import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Markdown from "react-markdown";
import Stats from "../components/stats";

const Content = styled.div``;

const content = `

📅 Lastupdated: 2018-09-28

**Personal:** The focus right now includes nailing a few healthy habits. Specifically I would like to meditate every morning and read every night. Also working out consistently about three times per week is a big one.

**Work:** I am currently available as a freelancer. I am pretty well seasoned in React, but I
am definitely open to learn something like Vue or Angular. I have also worked a lot with Node, MongoDB, some ElasticSearch.
  The most important thing would probably be the team. I want to find new challenges and new people to work with. I confident I can learn whatever
is neccessary for the assignment. I love a challenge.

  I was previously employed at [Netlight](https://www.netlight.com/) as a consultant. I sent a bit over at Bonnier News, building parts of their new publishing platform.

---

This is a [now page](https://sivers.org/nowff).
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
