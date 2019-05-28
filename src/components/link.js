import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import _ from 'lodash/fp'

export function Link({ children, ...props }) {
  if (props.to.startsWith('http')) {
    const anchorProps = _.omit(['activeClassName', 'exact'])(props)

    return (
      <a href={props.to} {...anchorProps}>
        {children}
      </a>
    )
  }

  return <GatsbyLink {...props}>{children}</GatsbyLink>
}
