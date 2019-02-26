import React, { Component } from "react";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Badge, Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import Gift from "./Gift";
import LoadingSpinner from "./LoadingSpinner";

const API = "http://dovanuidejos.bart.lt/wp";

export class FilteredGiftList extends Component {
  state = {
    gifts: [],
    isLoaded: false,
    error: false,
    errorMsg: ""
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
        } else {
          this.setState({
            isLoaded: true,
            error: true,
            errorMsg: "Pagal pateiktus duomenis dovanų nerasta."
          });
        }
      });
  };
  onDeleteClick = id => {
    this.props.deleteGift(id);
  };
  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="py-5">
          <LoadingSpinner />
        </div>
      );
    }
    if (this.state.error) {
      return (
        <div className="py-5 text-center">
          <h4 className="">Atsiprašome, bet...</h4>
          <p className="mb-0">{this.state.errorMsg}</p>
          <Button
            color="primary"
            size="lg"
            className="my-5"
            onClick={this.props.resetQuiz}
          >
            Bandyti dar kartą!
          </Button>
        </div>
      );
    }
    return (
      <Container>
        <h1 className="text-center pt-3">Dovanų sąrašas</h1>
        <TransitionGroup>
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
