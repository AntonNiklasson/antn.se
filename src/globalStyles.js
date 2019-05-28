import { createGlobalStyle } from 'styled-components'
import { darken } from 'polished'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
		box-sizing: border-box;
  }
	::selection {
		background: red;
		color: gold;
	}
  body {
    min-height: 100%;
    padding-bottom: 5em;
		font: 18px / 1.4 'Helvetica Neue', Helvetica, Arial, sans-serif;
		background: ${p => p.theme.background};
		background-image: linear-gradient(${p => p.theme.background}, ${p => darken(0.025, p.theme.background)});
    color: ${p => p.theme.text};
		transition-property: background, color;
		transition-duration: ${p => p.theme.transitionDuration};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${p => p.theme.text};
    line-height: 1.2;
		font-weight: 500;
	}
	ol, ul {
		margin: 1em 2em;
	}
  p {
    margin: 1em 0;
  }
  a {
    text-decoration: none;
		color: ${p => p.theme.text};
		transition: color 250ms;

    &:hover {
      color: ${p => p.theme.textSecondary};
    }
  }
  img {
    max-width: 100%;
  }
  hr {
    width: 60%;
    height: 1px;
    margin: 2em auto;
    border: none;
    background: ${p => p.theme.border};
  }
  .twitter-tweet {
    margin: 1em auto;
  }
  pre {
		background: ${p => p.theme.backgroundSecondary};
		border-radius: .3em;
    padding: 1em;
		font-size: .8em;
		color: ${p => p.theme.text};
		margin: 1em 0;
		font-weight: lighter;
	}
	:not(pre) > code {
		display: inline-block;
		margin: .2em 0;
		padding: .1em .4em;
		font-size: .8em;
		font-weight: lighter;
		background: ${p => p.theme.backgroundSecondary};
	}
	kbd {
		display: inline-block;
		margin: .2em;
		padding: .3em .5em;
		background: white;
		background-image: linear-gradient(white, #EEE);
		box-shadow: 0 2px 3px #DDD inset, 0 4px 0 ${p => p.theme.backgroundSecondary};
		border: 1px solid ${p => p.theme.border};
		border-radius: 4px;
		color: #555;
		letter-spacing: -1px;
		font-size: .9em;
	}
	blockquote {
		margin: 1em 2em;
		padding: 1em;
		background: ${p => p.theme.backgroundSecondary};
		font-size: .9em;

		&.note {
			border-left: 3px solid ${p => p.theme.accent};
		}
	}
`
