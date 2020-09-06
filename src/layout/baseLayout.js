import React from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/react'
import { theme, breakpoints } from '../theme.js'
import { GlobalStyles } from '../globalStyles.js'
import { Header, YoutubeEmbed } from '../components'

const ResponsiveWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 1em;

  @media (min-width: ${breakpoints.medium}) {
    width: 70%;
  }

  @media (min-width: ${breakpoints.large}) {
    width: 1000px;
  }
`

export function BaseLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <title>antn.se</title>
        </Helmet>
        <GlobalStyles />
        <ResponsiveWrapper>
          <Header />
          <MDXProvider components={{ YoutubeEmbed }}>{children}</MDXProvider>
        </ResponsiveWrapper>
      </>
    </ThemeProvider>
  )
}
