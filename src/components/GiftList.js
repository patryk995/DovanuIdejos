import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Container } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import Gift from "./Gift";
const API = "http://dovanuidejos.bart.lt/wp";

class GiftList extends Component {
  state = {
    gifts: [],
    pageNumber: 1,
    perPage: 5,
    hasMore: true,
    isLoaded: false
  };
  componentDidMount() {
    this.getGifts();
  }
  getGifts = () => {
    axios
      .get(
        `${API}/wp-json/wp/v2/gifts?per_page=${this.state.perPage}&page=${
          this.state.pageNumber
        }`
      )
      .then(res => {
        console.log(res);
        this.setState({
          gifts: res.data,
          isLoaded: true
        });
      });
  };
  loadFunc = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
    axios
      .get(
        `${API}/wp-json/wp/v2/gifts?per_page=${this.state.perPage}&page=${
          this.state.pageNumber
        }`
      )
      .then(res => {
        this.setState({
          // gifts: [...this.state.gifts, res.data],
          gifts: this.state.gifts.concat(res.data),
          isLoaded: true
        });
      })
      .catch(err => {
        this.setState({ hasMore: false });
      });
  };
  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="py-5">
          <LoadingSpinner />
        </div>
      );
    }
    return (
      <Container>
        <h1 className="text-center pt-3">Visas dovanų sąrašas</h1>
        {/* <TransitionGroup className="gift-list"> */}
        <InfiniteScroll
          dataLength={this.state.gifts.length}
          next={this.loadFunc}
          hasMore={this.state.hasMore}
          loader={<LoadingSpinner />}
        >
          {this.state.gifts.map(({ id, name, ...gift }) => (
            // <CSSTransition key={id} timeout={500} classNames="fade">
            <Gift key={id} gift={gift} />
            // </CSSTransition>
          ))}
        </InfiniteScroll>
        {/* </TransitionGroup> */}
      </Container>
    );
  }
}

export default GiftList;
