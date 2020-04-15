import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
        font-family: inherit;
        font-size: 1em;
        border: 1px solid ${p => p.theme.border};
        background: ${p => p.theme.background};
        padding: .2em;
        border-radius: 3px;
`

const StyledTextarea = styled(StyledInput)`
        height: 10em;
        resize: none;
`

export function Input({ multiline = false, ...props }) {
  return multiline ? <StyledTextarea as="textarea" {...props} /> : <StyledInput {...props} />
}
