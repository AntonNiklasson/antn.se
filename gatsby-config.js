module.exports = {
  siteMetadata: {
    title: 'antn.se',
    author: 'Anton Niklasson',
    siteUrl: 'http://www.antn.se',
    description: "Anton's personal website",
    links: [
      'https://github.com/AntonNiklasson',
      'https://www.linkedin.com/in/antonniklasson/',
      'https://twitter.com/AntonNiklasson',
    ],
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/layout/postLayout.js'),
        },
        gatsbyRemarkPlugins: [`gatsby-remark-prismjs`, `gatsby-remark-images`],
      },
    },
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        code: 'antn',
        head: false,
        pixel: false,
      },
    },
    `gatsby-plugin-stylus`,
    'gatsby-plugin-twitter',
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-remark-images`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
