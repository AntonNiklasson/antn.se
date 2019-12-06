import React from 'react'
import moment from 'moment'
import emoji from 'node-emoji'
import styled from 'styled-components'

const Time = styled.time`
  font-size: 0.75em;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${p => p.theme.textSecondary};
`

export const Timestamp = ({ date }) => {
  const dayDiff = moment().diff(moment(date), 'days')
  const isToday = dayDiff < 1
  const dateString = isToday ? 'Today' : `${dayDiff} days ago`

  return <Time>{dateString}</Time>
}
