const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/layout/post.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
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
        `
      ).then(result => {
        if (result.error) {
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach((post, index) => {
          createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
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
