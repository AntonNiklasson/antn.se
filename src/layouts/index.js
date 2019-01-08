import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Header from '../components/header'

import './index.css'

const Container = styled.div`
  .content {
    width: 90%;
    max-width: 700px;
    margin: 8rem auto;

    @media (max-width: 750px) {
      margin-top: 8rem;
    }
  }
`

const Layout = ({ children, data }) => (
  <Container>
    <Helmet title={data.site.siteMetadata.title} />
    <Header />
    <div className="content">{children()}</div>
  </Container>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
