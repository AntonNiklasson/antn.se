import React from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { Input, Button } from '../components'

function FormField({ label, children }) {
  return (
    <label className="flex flex-col justify-center py-2 color-gray-700 text-sm font-semibold">
      {label}: {children}
    </label>
  )
}

export function ContactForm() {
  const [state, handleSubmit] = useForm('myylgaqj')

  return (
    <div className="my-8">
      {state.succeeded ? (
        <div className="p-4 rounded bg-green-100 text-green-900 font-semibold">
          <p>Thank you for reaching out! I&apos;ll get back to you 🤗</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormField label="Email">
            <Input id="email" type="email" name="email" />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </FormField>
          <FormField label="Message">
            <Input multiline id="message" name="message" />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </FormField>
          <Button type="submit" disabled={state.submitting}>
            Send
          </Button>
        </form>
      )}
    </div>
  )
}

/*
export function ContactForm() {
  const [state, handleSubmit] = useForm({
    site: '4649adab2ef7',
    form: 'contact',
  })

  return (
    <div>
      {state.errors.length ? (
        <div>
          <ul>
            {state.errors.map(error => (
              <li key={error.field}>
                {error.field}: {error.message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {state.succeeded ? (
        <div>
          {`Thank you for reaching out. I'll get back to you as soon as
                possible 👋`}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormField label="Email">
            <Input type="email" name="email" disabled={state.submitting} />
          </FormField>
          <FormField label="Message">
            <Input
              multiline
              id="message"
              name="message"
              disabled={state.submitting}
            />
          </FormField>
          <Button disabled={state.submitting}>Send</Button>
        </form>
      )}
    </div>
  )
}
*/
