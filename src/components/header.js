import React from "react";
import styled from "styled-components";
import get from "lodash/get";
import emoji from "node-emoji";
import Link from "./link";

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #eee;
  background: white;

  .inner {
    width: 100%;
    max-width: 900px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    padding: 0 1em;

    @media (max-width: 750px) {
      flex-direction: column;
    }
  }

  h1 {
    a {
      color: #333;
      font-weight: 300;

      &:hover {
        color: #777;
      }
    }
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;

    a {
      padding: 8px;
      color: #555;
      border-bottom: 3px solid transparent;

      &.active,
      &:hover {
        border-bottom: 3px solid Tomato;
      }
    }
  }
`;

const links = [
  { title: "Notes", url: "/" },
  { title: "Now", url: "/now" },
  { title: "CV", url: "http://cv.antonniklasson.se" },
  { title: "GitHub", url: "https://github.com/AntonNiklasson" },
  { title: "LinkedIn", url: "https://www.linkedin.com/in/antonniklasson/" },
  { title: "Twitter", url: "https://twitter.com/AntonNiklasson" },
  { title: "Telegram", url: "https://t.me/antonniklasson" }
];

const Header = () => {
  return (
    <Container>
      <div className="inner">
        <h1>
          <a href="/">Anton Niklasson</a>
        </h1>
        <nav>
          {links.map(link => (
            <Link to={link.url} activeClassName="active">
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </Container>
  );
};

export default Header;
