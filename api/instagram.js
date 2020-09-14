const fetch = require('node-fetch')

const cache = {
  data: null,
  timestamp: null,
  ttl: 1000 * 60 * 10, // 10 minutes
}

function pick(properties, source) {
  const picked = {}

  for (const property of properties) {
    picked[property] = source[property]
  }

  return picked
}

async function fetchFromInstagram() {
  const url = `https://www.instagram.com/graphql/query/?query_hash=bfa387b2992c3a52dcbe447467b4b771&variables=%7B%22id%22%3A%22173737006%22%2C%22first%22%3A12%2C%22after%22%3A%22QVFEd050X3pCczJlS0lHNG5ldnFRVHQ2U0FFSmJ1enNKbkNlR0t0RW84VFUzbmpiZXh4SkJjaldyMERMTC1sWFltbmFEeVQ0UHh3cjJqa3JUb3VNbm45NQ%3D%3D%22%7D`

  const response = await fetch(url)
  const data = await response.json()

  const output = data.data.user.edge_owner_to_timeline_media.edges.map(
    ({ node }) => {
      return pick(
        ['display_url', 'shortcode', 'thumbnail_src', 'dimensions'],
        node,
      )
    },
  )

  return output
}

async function getData() {
  const now = Date.now()

  if (!cache.data || now > cache.timestamp + cache.ttl) {
    const instaData = await fetchFromInstagram()

    cache.data = instaData
    cache.timestamp = now

    return instaData
  } else {
    return cache.data
  }
}

module.exports = async (req, res) => {
  const photos = await getData()

  res.status(200).send({ photos })
}
