import React from "react";
import axios from "axios";
import moment from "moment";
import emoji from "node-emoji";
import styled from "styled-components";

const Container = styled.div`
  font-size: 1.1em;
  color: #444;
  text-align: center;
  font-size: 16px;

  & div {
    display: flex;
    align-items: center;
  }

  & span.number {
    margin: 0 0.3em;
    font-size: 1.3em;
    color: #222;
    font-weight: bold;
    font-family: "Oswald", sans-serif;
  }

  & span.emoji {
    font-size: 1.8em;
    margin: 0 0 0 0.3em;
  }
`;

class Stats extends React.Component {
  state = {
    isFetching: false,
    phoneUnlocksToday: null
  };

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

  render() {
    const { isFetching, phoneUnlocksToday } = this.state;

    return (
      <Container>
        {isFetching && <h3>Analyzing human...</h3>}
        {Number.isInteger(phoneUnlocksToday) && (
          <div>
            Anton unlocked his phone{" "}
            <span className="number">{phoneUnlocksToday}</span> times today<span className="emoji">
              {this.getReactionEmoji()}
            </span>
          </div>
        )}
      </Container>
    );
  }
}

export default Stats;
