import React, { useState, useEffect } from 'react'
import { animated, useSpring, useSprings } from 'react-spring'
import { BaseLayout } from '../layout/baseLayout'
import { Loader } from '../components'

const springs = [
  {
    from: {
      transform: `scale(0.8) rotate(2deg)`,
    },
    to: {
      transform: `scale(1.0) rotate(0deg)`,
    },
    config: {
      mass: 20,
      tension: 300,
      friction: 20,
    },
  },
]

export default () => {
  const [loading, setLoading] = useState(true)
  const [photos, setPhotos] = useState([])
  const [animations] = useSprings(springs.length, i => springs[i])

  useEffect(() => {
    async function grabData() {
      const response = await fetch('/api/instagram')
      const data = await response.json()

      setLoading(false)
      setPhotos(data.photos)
    }

    grabData()
  }, [])

  return (
    <BaseLayout>
      <div
        css={`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 1em;
          align-items: center;
        `}
      >
        {loading && <Loader />}
        {photos.map(photo => (
          <animated.img
            key={photo.shortcode}
            src={photo.display_url}
            style={{
              ...animations[0],
            }}
          />
        ))}
      </div>
    </BaseLayout>
  )
}
