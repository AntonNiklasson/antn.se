import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import emoji from 'node-emoji'
import Stats from '../components/stats'

const Content = styled.div`
  footer {
    display: flex;
    justify-content: space-between;
    margin: 3em 0 0 0;
    padding: 1em 0;
    border-top: 1px solid #ccc;
    font-weight: bold;
    font-size: 14px;
  }
`

const content = `
${emoji.get('thinking_face')} Here's what's on my mind right now: 

- ${emoji.get(
  'running'
)} _I want to get back to working out and meditating regularly_
- 🌎 Solo travel
- 👨‍💻 I want to learn Scala or something similar

---

I recently founded my own company - I am now available as a freelancer! 😍 I have done a lot of React, Redux, React Native and Node.js previously.

I spend some time working on different projects, some are publicly available some are not. Here's a few:

- [LearnReact.xyz](http://www.learnreact.xyz)
- [CSSGrid.pro](http://www.cssgrid.pro)
- [react-dategrid](https://www.github.com/AntonNiklasson/react-dategrid)
- [react-clickcopy](https://www.github.com/AntonNiklasson/react-clickcopy)

I was previously employed at [Netlight](https://www.netlight.com/) as a consultant. I spent about a year and a half at Bonnier News building parts of their new publishing platform.
`

class NowPage extends React.Component {
  render() {
    return (
      <Content>
        <Markdown source={content} />
        <footer>
          <span>📅 Last updated: 2018-10-21</span>
          <span>
            This is a <a href="https://sivers.org/nowff">now page</a>
          </span>
        </footer>
      </Content>
    )
  }
}

export default NowPage
