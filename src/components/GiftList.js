import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Container, ListGroup } from "reactstrap";
import { connect } from "react-redux";
import { getGifts, deleteGift } from "../actions/giftActions";
import PropTypes from "prop-types";
import LoadingFixed from "./LoadingFixed";
import axios from "axios";
import Gift from "./Gift";

class GiftList extends Component {
  state = {
    gifts: [],
    isLoaded: false
  };
  componentDidMount() {
    this.getGifts();
  }
  getGifts = () => {
    axios.get("/wp-json/wp/v2/gifts").then(res =>
      this.setState({
        gifts: res.data,
        isLoaded: true
      })
    );
  };
  onDeleteClick = id => {
    this.props.deleteGift(id);
  };
  render() {
    if (!this.state.isLoaded) {
      return <LoadingFixed />;
    }
    return (
      <Container>
        <TransitionGroup>
          {this.state.gifts.map(({ id, ...gift }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <Gift key={id} gift={gift} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    );
  }
}

export default GiftList;
