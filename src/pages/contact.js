import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '../layout/baseLayout'
import { ContactForm } from '../components'

const Content = styled.div`
  max-width: 30em;
  margin: 0 auto;
`

export default function ContactPage() {
  return (
    <BaseLayout>
      <Content>
        <p>
          You can get in touch with me on{' '}
          <a href="https://twitter.com/AntonNiklasson">twitter</a>,{' '}
          <a href="https://www.linkedin.com/in/antonniklasson/">linkedin</a> or
          through email in this form:
        </p>
        <ContactForm />
      </Content>
    </BaseLayout>
  )
}
