import React from 'react'
import styled from 'styled-components'
import { useForm } from '@statickit/react'
import { Input, Button } from '../components'

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

const Errors = styled.div`
  background: ${p => p.theme.backgroundWarning};
  border-left: 3px solid orange;
  margin: 1em 0;
  padding: 1em;
  font-size: 0.9em;
  color: orange;

  ul {
    margin: 0;
    list-style: none;
  }
`

export function ContactForm() {
  const [state, handleSubmit] = useForm({
    site: '4649adab2ef7',
    form: 'contact',
  })

  return (
    <div>
      {state.errors.length ? (
        <Errors>
          <ul>
            {state.errors.map(error => (
              <li key={error.field}>
                "{error.field}" {error.message}
              </li>
            ))}
          </ul>
        </Errors>
      ) : null}
      {state.succeeded ? (
        <Message>
          {`Thank you for reaching out. I'll get back to you as soon as
                possible 👋`}
        </Message>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormElement>
            <label htmlFor="message">What can I do for you?</label>
            <Input
              multiline
              id="message"
              name="message"
              disabled={state.submitting}
            />
          </FormElement>
          <FormElement>
            <label htmlFor="email">Your email:</label>
            <Input id="email" name="email" disabled={state.submitting} />
          </FormElement>
          <Button disabled={state.submitting}>Send</Button>
        </form>
      )}
    </div>
  )
}
