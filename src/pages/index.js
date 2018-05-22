import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;
const Links = styled.div`
  display: flex;
  font-family: "Oswald", sans-serif;

  & a {
    margin: 0 0.3em;
    color: #ccc;
    text-decoration: none;
    transition: color 300ms;

    &:hover: {
      color: white;
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
