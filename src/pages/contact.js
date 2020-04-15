import React from 'react'
import styled from 'styled-components'
import { useForm } from '@statickit/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import { BaseLayout } from '../layout/baseLayout'
import { Input, Button } from '../components'

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
        padding-top: 1em;
`

const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;

  label {
    font-size: 0.8em;
  }
`

const Message = styled.div`
  margin: 2em 0;
  padding: 1em;
  border: 3px solid ${p => p.theme.accent};
  color: ${p => p.theme.accent};
`

const links = [
  { icon: faGithub, url: 'https://github.com/AntonNiklasson' },
  { icon: faLinkedin, url: 'https://www.linkedin.com/in/antonniklasson/' },
  { icon: faTwitter, url: 'https://twitter.com/AntonNiklasson' },
]

export default function ContactPage() {
  const [state, handleSubmit] = useForm({
    site: '4649adab2ef7',
    form: 'contact',
  })

  return (
    <BaseLayout>
      <div
        css={`
          display: flex;
          justify-content: space-evenly;
                                        margin: 1em 0;
          font-size: 2em;
        `}
      >
        {links.map(link => (
          <a key={link.url} href={link.url}>
            <FontAwesomeIcon icon={link.icon} />
          </a>
        ))}
      </div>
      <FormContainer>
        {state.errors ? (
          <ul>
            {state.errors.map(error => (
              <li key={error.field}>{JSON.stringify(error, null, 2)}</li>
            ))}
          </ul>
        ) : null}
        {state.succeeded ? (
          <Message>
            {`Thank you for reaching out. I'll get back to you as soon as
                possible 👋`}
          </Message>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormElement>
              <label htmlFor="email">How can I get back to you?</label>
              <Input id="email" name="email" disabled={state.submitting} />
            </FormElement>
            <FormElement>
              <label htmlFor="message">How can I help?</label>
              <Input
                multiline
                id="message"
                name="message"
                disabled={state.submitting}
              />
            </FormElement>
            <Button disabled={state.submitting}>Send</Button>
          </form>
        )}
      </FormContainer>
    </BaseLayout>
  )
}
