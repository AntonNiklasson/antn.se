import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import get from "lodash/get";
import emoji from "node-emoji";

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.5em;
  border-bottom: 1px solid #eee;
  background: white;

  .inner {
    width: 100%;
    max-width: 900px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
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
            <a
              href={link.url}
              className={window.location.pathname === link.url ? "active" : ""}
            >
              {link.title}
            </a>
          ))}
        </nav>
      </div>
    </Container>
  );
};

export default Header;
