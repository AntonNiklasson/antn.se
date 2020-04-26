import React from 'react'

export function YoutubeEmbed({ videoId }) {
  return (
    <div
      css={`
        background: ${p => p.theme.backgroundSecondary};
        padding: 1em;
        display: flex;
        justify-content: center;
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        height: 0;
        margin: 2em;
      `}
    >
      <iframe
        css={`
          position: absolute;
          top: 5%;
          left: 5%;
          width: 90%;
          height: 90%;
        `}
        src={`https://www.youtube.com/embed/${videoId}?controls=1`}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  )
}
