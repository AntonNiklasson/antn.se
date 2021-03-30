import React from 'react'
import { Layout } from '../layout/layout'
import { ContactForm } from '../components'

export default function ContactPage() {
  return (
    <Layout>
      <div className="prose">
        <p>
          You can get in touch with me on{' '}
          <a href="https://twitter.com/AntonNiklasson">twitter</a>,{' '}
          <a href="https://www.linkedin.com/in/antonniklasson/">linkedin</a> or
          through email in this form:
        </p>
      </div>
      <ContactForm />
    </Layout>
  )
}
