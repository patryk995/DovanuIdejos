import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { Redirect } from "react-router-dom";
// import { addAnswer } from "../actions/answerActions";
// import { getFilteredGifts } from "../actions/giftActions";
import SimpleQuestion from "./questions/SimpleQuestion";
import RangeQuestion from "./questions/RangeQuestion";
import FilteredGiftList from "./FilteredGiftList";
import LoadingSpinner from "./LoadingSpinner";
const API = "http://dovanuwp.bart.lt";
export class Quiz extends Component {
  state = {
    questions: [],
    questionsAnswered: 0,
    questionsCount: 100,
    isLoaded: false,
    error: false,
    answers: []
  };

  componentWillMount() {
    axios
      .get(`${API}/wp-json/wp/v2/questions`)
      .then(res => {
        const tempQuestions = res.data;
        tempQuestions.map(question => {
          let answers = [];
          const answersString = question.acf.answers;
          const tempAnswersArr = answersString.split("\r\n");
          tempAnswersArr.map(answerString => {
            const [textString, valueString] = answerString.split(",");
            const [text, textVal] = textString.split(":");
            const [value, valueVal] = valueString.split(":");
            const tempObj = {
              [text]: textVal,
              [value]: valueVal
            };
            answers = [...answers, tempObj];
          });
          question.acf.answers = answers;
        });
        this.setState({
          questions: tempQuestions,
          questionsCount: res.data.length,
          isLoaded: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoaded: true,
          error: true
        });
      });
  }

  onClick = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.addAnswer(name, value);
  };
  addAnswer = (name, value) => {
    this.setState(prevState => ({
      answers: { ...prevState.answers, [name]: value },
      questionsAnswered: prevState.questionsAnswered + 1
    }));
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="py-5">
          <LoadingSpinner />
        </div>
      );
    }
    if (
      this.state.questionsAnswered === this.state.questionsCount &&
      !this.state.error
    ) {
      return (
        <div className="py-5">
          <FilteredGiftList answers={this.state.answers} />;
        </div>
      );
    }
    if (this.state.error) {
      return (
        <div className="alert alert-dismissible alert-warning">
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          <h4 className="alert-heading">Warning!</h4>
          <p className="mb-0">
            Best check yo self, you're not looking too good. Nulla vitae elit
            libero, a pharetra augue. Praesent commodo cursus magna,{" "}
            <a href="#" class="alert-link">
              vel scelerisque nisl consectetur et
            </a>
            .
          </p>
        </div>
      );
    }
    if (
      this.state.questions[this.state.questionsAnswered].acf.category ===
      "price"
    ) {
      return (
        <div className="py-5">
          <RangeQuestion
            question={this.state.questions[this.state.questionsAnswered]}
            onClick={this.onClick}
          />
        </div>
      );
    }

    return (
      <div className="py-5">
        <SimpleQuestion
          question={this.state.questions[this.state.questionsAnswered]}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

export default Quiz;
