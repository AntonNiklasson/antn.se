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

- ${emoji.get('running')} I want to get back to working out and meditating regularly
- 🌎 Travels. Something might be revealed in my [NomadList profile](https://www.nomadlist.com/@antonniklasson) shortly ${emoji.get('smirk')}

---

I spend some time working on different projects, some are publicly available some are not. The one I'm the most into right now is *[Shortcuts.rocks](http://www.shortcuts.rocks)*. Some others are [LearnReact.xyz](http://www.learnreact.xyz), [CSSGrid.pro](http://www.cssgrid.pro), [react-dategrid](https://www.github.com/AntonNiklasson/react-dategrid) and [react-clickcopy](https://www.github.com/AntonNiklasson/react-clickcopy).

---

I recently founded my own company - I am now available as a freelancer! 😍 I have done a lot of React, Redux, React Native and Node.js previously.

I was previously employed at [Netlight](https://www.netlight.com/) as a consultant. I spent about a year and a half at Bonnier News building parts of their new publishing platform.
`

class NowPage extends React.Component {
  render() {
    return (
      <Content>
        <Markdown source={content} />
        <footer>
          <span>📅 Last updated: 2018-12-05</span>
          <span>
            This is a <a href="https://sivers.org/nowff">now page</a>
          </span>
        </footer>
      </Content>
    )
  }
}

export default NowPage
