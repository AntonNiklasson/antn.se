const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/layout/postLayout.js')

    resolve(
      graphql(
        `
          {
            allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.error) {
          reject(result.errors)
        }

        result.data.allMdx.edges.forEach(post => {
          createPage({
            path: post.node.fields.slug,
            component: postTemplate,
            context: {
              slug: post.node.fields.slug,
            },
          })
        })
      }),
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const pattern = /[0-9]{6}-([^/]*)/
    const value = createFilePath({ node, getNode })
    const slug = pattern.exec(value)[1]

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}
