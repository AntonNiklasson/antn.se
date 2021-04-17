import React from 'react'
import Helmet from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'
import { YoutubeEmbed } from '../components'

function HeaderLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block p-1 font-bold text-gray-900 transition hover:text-blue-900 border-b-4 border-transparent transition hover:border-b-2 hover:border-blue-600"
    >
      {children}
    </Link>
  )
}

export function Layout({ children }) {
  return (
    <div className="bg-white p-4">
      <Helmet>
        <title>antn.se</title>
      </Helmet>
      <header className="py-8">
        <div className="flex flex-wrap justify-between items-center max-w-xl mx-auto">
          <a href="/">
            <h1 className="text-3xl font-bold">
              anton<span className="animate-ping-slow">|</span>
            </h1>
          </a>
          <nav className="flex flex-wrap space-x-2">
            <HeaderLink to="https://cv.antn.se">Resume</HeaderLink>
            <HeaderLink to="/notes">Notes</HeaderLink>
            <HeaderLink to="/photos">Photos</HeaderLink>
            <HeaderLink to="/contact/">Contact</HeaderLink>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-xl">
        <MDXProvider components={{ YoutubeEmbed }}>{children}</MDXProvider>
      </div>
    </div>
  )
}
