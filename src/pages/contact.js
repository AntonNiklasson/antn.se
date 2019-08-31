import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { BaseLayout } from '../layout/baseLayout'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
  font-size: 20px;
`
const Form = styled.form`
  width: 90%;
  margin: auto;
  max-width: 500px;
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
const Button = styled.button`
  font-size: 0.8em;
  font-weight: bold;
  border-radius: 0.1em;
  padding: 0.3em 1em;
  background: ${p => p.theme.accent};
  color: ${p => p.theme.background};
  border: 1px solid ${p => p.theme.border};
  border-radius: 3px;
  text-transform: uppercase;
`
const Error = styled.div`
  background: pink;
  color: red;
  border: 1px solid red;
  margin: 1em 0;
  padding: 0.5em;
  font-size: 0.8em;
`

export default function ContactPage() {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setSending(true)
      const response = await axios.post('https://pi.antn.se/inbox', {
        from: email,
        body,
      })
      console.log({ response })
    } catch (error) {
      console.error(error)
      setError(true)
    }

    setSending(false)
  }

  return (
    <BaseLayout>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <FormElement>
            <label>How can I get back to you?</label>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="name@domain.com"
              disabled={sending}
            />
          </FormElement>
          <FormElement>
            <label>What is up?</label>
            <Textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              disabled={sending}
            />
          </FormElement>
          {error && <Error>This is not implemented properly yet 🤷‍♀️</Error>}
          <Button disabled={sending}>Send</Button>
        </Form>
      </Wrapper>
    </BaseLayout>
  )
}
