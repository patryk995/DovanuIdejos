import React, { Component } from "react";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Badge, Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import Gift from "./Gift";
import LoadingSpinner from "./LoadingSpinner";

const API = "http://dovanuwp.bart.lt";

export class FilteredGiftList extends Component {
  state = {
    gifts: [],
    isLoaded: false
  };
  componentDidMount() {
    this.getFilteredGifts();
  }
  getFilteredGifts = () => {
    const [pricemin, pricemax] = this.props.answers.price.split(",");
    const age = this.props.answers.age;
    const gender = this.props.answers.gender;
    let giftIds = [];
    let urlparams = "?";
    axios
      .get(
        `${API}/wp-json/filt/v1/gender/${gender}/age/${age}/pmin/${pricemin}/pmax/${pricemax}`
      )
      .then(res => {
        giftIds = res.data;
        if (giftIds) {
          giftIds.map(giftId => {
            urlparams += `&include[]=${giftId}`;
          });
          axios.get(`${API}/wp-json/wp/v2/gifts${urlparams}`).then(res =>
            this.setState({
              gifts: res.data,
              isLoaded: true
            })
          );
        }
      });
  };
  onDeleteClick = id => {
    this.props.deleteGift(id);
  };
  render() {
    if (!this.state.isLoaded) {
      return <LoadingSpinner />;
    }
    return (
      <Container>
        <TransitionGroup className="">
          {this.state.gifts.map(({ id, ...gift }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <Gift gift={gift} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    );
  }
}

export default FilteredGiftList;
