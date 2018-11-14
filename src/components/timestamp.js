import React from 'react'
import moment from 'moment'

export const RelativeTimestamp = ({ date }) => (
  <time className="date">{moment().diff(moment(date), 'days')} days ago</time>
)
