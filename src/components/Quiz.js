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
    questions1: [
      {
        title: "Kokia lytis?",
        name: "gender",
        answers: [
          { text: "Vyras", value: "m" },
          { text: "Moteris", value: "f" }
        ]
      },
      {
        title: "Kokiai amžiaus grupei priklauso?",
        name: "age",
        answers: [
          { text: "Vaikų(iki 12 metų)", value: "child" },
          { text: "Nepilnamečių (paauglys)", value: "teen" },
          { text: "Suagusiejų", value: "adult" },
          { text: "Senjorų", value: "senior" }
        ]
      },
      {
        title: "Koks yra dovanos biudžetas?",
        name: "price",
        answers: [{ text: "nuo", value: "0" }, { text: "iki", value: "200" }]
      }
    ],
    questions: [],
    questionsAnswered: 0,
    questionsCount: 100,
    isLoaded: false,
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
      .catch(err => console.log(err));
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
      return <LoadingSpinner />;
    }
    if (this.state.questionsAnswered === this.state.questionsCount) {
      return <FilteredGiftList answers={this.state.answers} />;
    }
    if (
      this.state.questions[this.state.questionsAnswered].acf.category ===
      "price"
    ) {
      return (
        <RangeQuestion
          question={this.state.questions[this.state.questionsAnswered]}
          onClick={this.onClick}
        />
      );
    }
    return (
      <SimpleQuestion
        question={this.state.questions[this.state.questionsAnswered]}
        onClick={this.onClick}
      />
    );
  }
}

export default Quiz;
