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
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

export class RangeQuestion extends Component {
  state = {
    minPrice: 0,
    maxPrice: 50
  };
  onInputChange = e => {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  };
  onRangeChange = rangeValues => {
    let [start, end] = rangeValues;
    this.setState({
      minPrice: start,
      maxPrice: end
    });
  };

  render() {
    const question = this.props.question;
    return (
      <Container className="question py-2 px-5">
        <h3 className="mb-3 text-center">{question.title.rendered}</h3>
        <Row className="flex-column flex-md-row flex-nowrap">
          <Col>
            <InputGroup className="mx-auto flex-nowrap justify-content-center">
              <InputGroupAddon addonType="prepend">Nuo</InputGroupAddon>
              <Input
                value={this.state.minPrice}
                style={{ maxWidth: "60px" }}
                name="minPrice"
                onChange={this.onInputChange}
              />
              <InputGroupAddon addonType="append">&euro;</InputGroupAddon>
            </InputGroup>
          </Col>
          <Col className="col-md-6 col-xl-8">
            <Container className="h-100 py-4 py-md-0">
              <Row className="d-flex h-100">
                <Range
                  style={{ margin: "auto" }}
                  onChange={this.onRangeChange}
                  value={[this.state.minPrice, this.state.maxPrice]}
                />
              </Row>
            </Container>
          </Col>
          <Col>
            <InputGroup className="mx-auto justify-content-center flex-nowrap">
              <InputGroupAddon addonType="prepend">Iki</InputGroupAddon>

              <Input
                value={this.state.maxPrice}
                style={{ maxWidth: "60px" }}
                name="maxPrice"
                onChange={this.onInputChange}
              />
              <InputGroupAddon addonType="append">&euro;</InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button
              block
              // className="mx-auto mt-5"
              color="primary"
              name={question.acf.category}
              value={[this.state.minPrice, this.state.maxPrice]}
              onClick={this.props.onClick}
            >
              Toliau
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RangeQuestion;
