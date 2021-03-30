import React from 'react'
import moment from 'moment'

export const Timestamp = ({ date }) => {
  const dayDiff = moment().diff(moment(date), 'days')
  const isToday = dayDiff < 1

  return (
    <time className="text-sm font-bold text-gray-600">
      {dayDiff > 20
        ? moment(date).format('MMMM DD, YYYY')
        : isToday
        ? 'Today'
        : `${dayDiff} days ago`}
    </time>
  )
}
