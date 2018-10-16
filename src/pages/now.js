import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Markdown from "react-markdown";
import Stats from "../components/stats";

const Content = styled.div``;

const content = `


🧠🤔 Here's what's on my mind right now: 

- _I want to get back to working out and meditating regularly_ 🧘‍♂️
- Solo-travel... 🌎
- I want to learn Scala or something similar 👨‍💻

---

I recently founded my own company - I am now available as a freelancer. I have done a lot of React, Redux, React Native and Node.js previously.

I spend some time working on a few different projects, some or publicly available some are not. Here's a few:

- [LearnReact.xyz](http://www.learnreact.xyz)
- [CSSGrid.pro](http://www.cssgrid.pro)
- [react-dategrid](https://www.github.com/AntonNiklasson/react-dategrid)
- [react-clickcopy](https://www.github.com/AntonNiklasson/react-clickcopy)
- [cv.antonniklasson.se](https://cv.antonniklasson.se)

I was previously employed at [Netlight](https://www.netlight.com/) as a consultant. I spent about a year and a half at Bonnier News building parts of their new publishing platform.

---

*📅 Last updated: 2018-10-16*

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
