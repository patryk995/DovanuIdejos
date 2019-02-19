import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export class SimpleQuestion extends Component {
  render() {
    const answers = this.props.question.acf.answers;
    const question = this.props.question;

    return (
      <Container className="question py-2 px-5">
        <h3 className="mb-3 text-center">{question.title.rendered}</h3>
        <Row>
          {answers.map(answer => (
            <Col className="col-12 my-3 col-md" key={answer.value}>
              <Button
                block
                color="primary"
                name={question.acf.category}
                value={answer.value}
                onClick={this.props.onClick}
              >
                {answer.text}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default SimpleQuestion;
