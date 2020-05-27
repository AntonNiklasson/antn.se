import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import { lightTheme } from '../theme.js'
import { GlobalStyles } from '../globalStyles.js'
import { Header, YoutubeEmbed } from '../components'

export function BaseLayout({ children }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <>
        <Helmet>
          <title>antn.se</title>
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <GlobalStyles />
        <div
          css={`
            width: 100%;
            max-width: 750px;
            margin: 0 auto;
            padding: 1em;
          `}
        >
          <Header />
          <MDXProvider components={{ YoutubeEmbed }}>{children}</MDXProvider>
        </div>
      </>
    </ThemeProvider>
  )
}
