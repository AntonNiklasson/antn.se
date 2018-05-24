import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import emoji from "node-emoji";

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
const Stats = styled.div`
  margin: 4em 0 0 0;
  font-size: 0.9em;
  color: #aaa;
  text-align: center;

  & div {
    display: flex;
    align-items: center;
  }

  & span.number {
    margin: 0 0.3em;
    font-size: 1.9em;
    color: white;
    font-weight: bold;
    font-family: "Oswald", sans-serif;
  }

  & span.emoji {
    font-size: 2em;
    margin: 0 0 0 0.3em;
  }
`;

class IndexPage extends React.Component {
  state = {
    isFetching: false,
    phoneUnlocksToday: null
  };

  componentDidMount() {
    this.setState({ isFetching: true });

    axios("https://antonpi.herokuapp.com/phone_unlock").then(res => {
      this.setState({
        isFetching: false,
        phoneUnlocksToday: res.data.filter(e =>
          moment().isSame(moment(e.when), "day")
        ).length
      });
    });
  }

  getReactionEmoji = () => {
    const n = this.state.phoneUnlocksToday;

    if (n > 100) return emoji.get("skull");
    if (n > 80) return emoji.get("scream");
    if (n > 60) return emoji.get("dizzy_face");
    if (n > 50) return emoji.get("cold_sweat");
    if (n > 30) return emoji.get("flushed");
    if (n > 20) return emoji.get("face_with_rolling_eyes");
    if (n > 10) return emoji.get("upside_down_face");

    return emoji.get("angel");
  };

  renderStats = () => {
    const { isFetching, phoneUnlocksToday } = this.state;
    return (
      <Stats>
        {isFetching && <h2>Analyzing human...</h2>}
        {Number.isInteger(phoneUnlocksToday) && (
          <div>
            Anton unlocked his phone{" "}
            <span className="number">{phoneUnlocksToday}</span> times today<span className="emoji">
              {this.getReactionEmoji()}
            </span>
          </div>
        )}
      </Stats>
    );
  };

  render() {
    return (
      <Wrapper>
        <h1>Anton Niklasson</h1>
        <Links>
          <a href="/notes">Notes</a>
          <a href="https://github.com/AntonNiklasson">GitHub</a>
          <a href="https://www.linkedin.com/in/antonniklasson/">LinkedIn</a>
          <a href="https://twitter.com/AntonNiklasson">Twitter</a>
          <a href="https://t.me/antonniklasson">Telegram</a>
        </Links>
        {this.renderStats()}
      </Wrapper>
    );
  }
}

export default IndexPage;
