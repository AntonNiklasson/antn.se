import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import get from "lodash/get";
import emoji from "node-emoji";
import Stats from "./stats";

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
  border-bottom: 1px solid #eee;

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

      &:hover {
        border-bottom: 3px solid Tomato;
      }
    }
  }
`;

const Header = () => {
  return (
    <Container>
      <h1>
        <a href="/">Anton Niklasson</a>
      </h1>
      <Stats />
      <nav>
        <a href="/now">Now</a>
        <a href="http://cv.antonniklasson.se">CV</a>
        <a href="https://github.com/AntonNiklasson">GitHub</a>
        <a href="https://www.linkedin.com/in/antonniklasson/">LinkedIn</a>
        <a href="https://twitter.com/AntonNiklasson">Twitter</a>
        <a href="https://t.me/antonniklasson">Telegram</a>
      </nav>
    </Container>
  );
};

export default Header;
