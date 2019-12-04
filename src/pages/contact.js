import React from 'react'
import styled from 'styled-components'
import { useForm } from '@statickit/react'
import TweetEmbed from 'react-tweet-embed'
import { BaseLayout } from '../layout/baseLayout'
import { Button } from '../components/button'

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding-top: 3em;
`

const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;

  label {
    font-size: 0.8em;
  }
`
const Input = styled.input`
  width: 100%;
  font-size: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
  background: #f8f8f8;
`
const Textarea = styled.textarea`
  font-size: 0.9em;
  font-family: inherit;
  height: 10em;
  padding: 0.5em;
  border: 1px solid #ccc;
  background: #f8f8f8;
  resize: none;
`

const Message = styled.div`
  margin: 2em 0;
  padding: 1em;
  border: 3px solid ${p => p.theme.accent};
  color: ${p => p.theme.accent};
`

const links = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/antonniklasson/' },
  { label: 'Twitter', url: 'https://twitter.com/AntonNiklasson' },
  { label: 'GitHub', url: 'https://twitter.com/AntonNiklasson' },
  { label: 'Instagram', url: 'https://www.instagram.com/anton.niklasson/' },
]

export default function ContactPage() {
  const [state, handleSubmit] = useForm({
    site: '4649adab2ef7',
    form: 'contact',
  })

  return (
    <BaseLayout>
      <FormContainer>
        {state.succeeded ? (
          <Message>
            {`Thank you for reaching out. I'll get back to you as soon as
                possible 👋`}
          </Message>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <FormElement>
                <label htmlFor="email">Your email:</label>
                <Input name="email" type="email" disabled={state.submitting} />
              </FormElement>
              <FormElement>
                <label htmlFor="message">How can I help?</label>
                <Textarea name="message" disabled={state.submitting} />
              </FormElement>
              <Button disabled={state.submitting}>Send</Button>
            </form>
            <TweetEmbed id="1042898164683038720" options={{ dnt: true }} />
          </>
        )}
        <div>
          <p>{"I'm also available on:"}</p>
          <ul>
            {links.map(link => (
              <li key={link.label}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </FormContainer>
    </BaseLayout>
  )
}
