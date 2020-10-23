import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import { Layout } from '../layout/layout'
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
    <Layout>
      <p>
        These photos are loading in real-time from my Instagram profile, through
        a serverless function.{' '}
        <a href="https://github.com/AntonNiklasson/antn.se/blob/master/api/instagram.js">
          Check out the code for it here.
        </a>
      </p>
      <p>
        The first load is probably really slow. Consecutive loads are cached
        though :)
      </p>

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
    </Layout>
  )
}
