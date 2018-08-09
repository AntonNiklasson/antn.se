import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Markdown from "react-markdown";
import Stats from "../components/stats";

const Content = styled.div``;

const content = `
> This is a [now page](https://sivers.org/nowff).

**PERSONAL:** The focus right now includes nailing a few healthy habits. Specifically I would like to meditate every morning and read every night. Also working out consistently about three times per week is a big one.

**WORK:** I am currently employed at [Netlight Consulting](https://www.netlight.com/) as an IT-consultant.
I have been at Bonnier News for a bit over a year now, building parts of their new publishing platform.

**FUTURE:**
- Start printing photos
- Find more time to be outdoors. Renting a kayak and sleeping in a tent
- Figure out what the next travel destination should be
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
