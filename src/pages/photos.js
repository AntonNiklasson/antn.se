import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import { BaseLayout } from '../layout/baseLayout'
import { Loader } from '../components'

const animation = {
  from: {
    transform: `translate(-500px, 0px)`,
    opacity: 0,
  },
  to: {
    transform: `translate(0px, 0px)`,
    opacity: 1,
  },
}

export default () => {
  const [loading, setLoading] = useState(true)
  const [loadedImgs, setLoadedImgs] = useState(0)
  const [photos, setPhotos] = useState([])
  const [props, set, stop] = useSpring(() => animation.from)

  function imgOnLoad(event) {
    setLoadedImgs(loadedImgs + 1)

    if (photos.length - 1 === loadedImgs) {
      setLoading(false)
      set(animation.to)
    }
  }

  useEffect(() => {
    async function grabData() {
      const response = await fetch('/api/instagram')
      const data = await response.json()

      setPhotos(data.photos)
    }

    grabData()
  }, [])

  return (
    <BaseLayout>
      {loading && (
        <div
          css={`
            display: flex;
            justify-content: center;
            padding: 4em;
          `}
        >
          <Loader />
        </div>
      )}
      <div
        css={`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 1em;
          align-items: center;
        `}
      >
        {photos.map(photo => (
          <animated.img
            onLoad={imgOnLoad}
            key={photo.shortcode}
            src={photo.display_url}
            style={props}
          />
        ))}
      </div>
    </BaseLayout>
  )
}
