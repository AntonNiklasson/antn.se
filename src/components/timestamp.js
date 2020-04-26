import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const Time = styled.time`
  font-size: 0.75em;
  text-transform: uppercase;
  font-weight: normal;
  letter-spacing: 1px;
  color: ${p => p.theme.textSecondary};
`

export const Timestamp = ({ date }) => {
  const dayDiff = moment().diff(moment(date), 'days')
  const isToday = dayDiff < 1

  return (
    <Time>
      {dayDiff > 20
        ? moment(date).format('MMMM DD YYYY')
        : isToday
        ? 'Today'
        : `${dayDiff} days ago`}
    </Time>
  )
}
