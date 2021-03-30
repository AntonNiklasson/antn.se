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

const Photos = () => {
  const [loading, setLoading] = useState(true)
  const [loadedImgs, setLoadedImgs] = useState(0)
  const [photos, setPhotos] = useState([])
  const [props, set] = useSpring(() => animation.from)

  function imgOnLoad() {
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
      <div className="prose">
        <p>
          These photos are loading in real-time from my Instagram profile,
          through a serverless function.{' '}
          <a href="https://github.com/AntonNiklasson/antn.se/blob/master/api/instagram.js">
            Check out the code for it here.
          </a>
        </p>
        <p>
          The first load is probably really slow. Consecutive loads are cached
          though :)
        </p>

        {loading && (
          <div className="flex justify-center items-center p-8">
            <Loader />
          </div>
        )}
        <div className="grid gap-4 grid-columns-3">
          {photos.map(photo => (
            <animated.img
              onLoad={imgOnLoad}
              key={photo.shortcode}
              src={photo.display_url}
              style={props}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Photos
