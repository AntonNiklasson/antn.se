import React from 'react'
import moment from 'moment'
import emoji from 'node-emoji'
import styled from 'styled-components'

const StyledTime = styled.time`
  font-size: 0.7em;
  font-weight: bold;
	color: ${p => p.theme.textSecondary};
`

export const RelativeTimestamp = ({ date }) => {
  const dayDiff = moment().diff(moment(date), 'days')
  const isToday = dayDiff < 1
  const dateString = isToday ? 'Today' : `${dayDiff} days ago`

  return (
    <StyledTime>
      {emoji.get('calendar')} {dateString}
    </StyledTime>
  )
}
