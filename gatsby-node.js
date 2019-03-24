const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.modifyBabelrc = ({ babelrc }) => ({
  ...babelrc,
  plugins: babelrc.plugins.concat(['transform-regenerator']),
})

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/layouts/post.js')

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

        const posts = result.data.allMarkdownRemark.edges

        posts.forEach((post, index) => {
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

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

	if (node.internal.type === `MarkdownRemark`) {
		const pattern = new RegExp('[0-9]{6}-([^/]*)')
		const value = createFilePath({ node, getNode })
		const slug = pattern.exec(value)[1]

		console.log({ pattern, value, slug })

    createNodeField({
      name: `slug`,
      node,
			value: slug
    })
  }
}
