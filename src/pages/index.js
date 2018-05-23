import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  color: white;
`;
const Links = styled.div`
  display: flex;
  margin: 1em 0 0 0;
  font-family: "Oswald", sans-serif;

  & a {
    margin: 0 0.3em;
    color: #ccc;
    text-decoration: none;
    transition: color 400ms;

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 5%;
      width: 90%;
      height: 2px;
      background: DarkOrange;
      opacity: 0.01;
      transition: opacity 400ms;
    }

    &:hover {
      position: relative;
      color: DarkOrange;

      &::after {
        opacity: 1;
      }
    }
  }
`;

const IndexPage = () => (
  <Wrapper>
    <h1>Anton Niklasson</h1>
    <Links>
      <a href="/notes">Notes</a>
      <a href="https://github.com/AntonNiklasson">GitHub</a>
      <a href="https://www.linkedin.com/in/antonniklasson/">LinkedIn</a>
      <a href="https://twitter.com/AntonNiklasson">Twitter</a>
      <a href="https://t.me/antonniklasson">Telegram</a>
    </Links>
  </Wrapper>
);

export default IndexPage;
