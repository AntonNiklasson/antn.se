import React from 'react'
import styled from 'styled-components'
import { Layout } from '../layout/layout'
import { ContactForm } from '../components'

const Content = styled.div`
  max-width: 30em;
  margin: 0 auto;
  color: ${p => p.theme.textSecondary};
`

export default function ContactPage() {
  return (
    <Layout>
      <Content>
        <p>
          You can get in touch with me on{' '}
          <a href="https://twitter.com/AntonNiklasson">twitter</a>,{' '}
          <a href="https://www.linkedin.com/in/antonniklasson/">linkedin</a> or
          through email in this form:
        </p>
        <ContactForm />
      </Content>
    </Layout>
  )
}
