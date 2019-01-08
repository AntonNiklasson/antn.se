import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import emoji from 'node-emoji'
import moment from 'moment'

import singaporePhoto from '../assets/img/singapore.jpg'

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
I landed in Singapore yesterday! 🇸🇬

<img src="${singaporePhoto}" width="300" />

I'll be spending a total of about four nights here, before heading down to Bali. This trip is a bit of an experiment for me. It's my first time travelling solo, and I'm also intending to spend a fair amount of time working on personal projects.

I took a few weeks off my current assignment at Creuna to do this. I'll be back there consulting early february.
`

class NowPage extends React.Component {
  render() {
    return (
      <Content>
        <Markdown source={content} escapeHtml={false} />
        <footer>
          <span>📅 Updated {moment().format('YYYY-MM-DD')}</span>
          <span>
            This is a <a href="https://sivers.org/nowff">now page</a>
          </span>
        </footer>
      </Content>
    )
  }
}

export default NowPage
