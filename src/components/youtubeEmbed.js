import React from 'react'

export function YoutubeEmbed({ videoId }) {
  return (
    <div className="my-8 shadow-xl aspect-w-16 aspect-h-9">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?controls=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}
