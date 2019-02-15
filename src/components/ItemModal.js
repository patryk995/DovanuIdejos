import React, { Component } from "react";
import {
  ButtonGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { addGift } from "../actions/giftActions";
export class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
    price: "",
    gender: [],
    age: []
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeGender = e => {
    const value = e.target.value;
    const index = this.state.gender.indexOf(value);
    let currentState = this.state.gender;
    if (index === -1) {
      currentState = [...currentState, value];
    } else {
      currentState.splice(index, 1);
    }
    this.setState({ gender: currentState });
  };

  onChangeAge = e => {
    const value = e.target.value;
    const index = this.state.age.indexOf(value);
    let currentState = this.state.age;
    if (index === -1) {
      currentState = [...currentState, value];
    } else {
      currentState.splice(index, 1);
    }
    this.setState({ age: currentState });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
      gender: this.state.gender,
      age: this.state.age,
      price: parseInt(this.state.price)
    };
    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();

    // Clean state after submit
    this.setState({
      name: "",
      gender: [],
      age: []
    });
  };
  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Įkelti dovaną
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Pridėti į dovanų sąrašą
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Row>
                  <Col md="8">
                    <Label for="item">Dovana</Label>
                    <Input
                      type="text"
                      name="name"
                      id="item"
                      placeholder="Dovanos pavadinimas"
                      onChange={this.onChange}
                    />
                  </Col>
                  <Col md="4">
                    <Label for="price">Preliminari kaina</Label>
                    <InputGroup>
                      <Input
                        type="text"
                        name="price"
                        id="price"
                        placeholder="Kaina"
                        onChange={this.onChange}
                      />
                      <InputGroupAddon addonType="append">
                        &euro;
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>

                <hr />
                <Label for="gender">Lytis</Label>
                <ButtonGroup id="gender" className="d-flex">
                  <Button
                    color={
                      this.state.gender.includes("m") ? "primary" : "secondary"
                    }
                    onClick={this.onChangeGender}
                    value={"m"}
                  >
                    Vyrams
                  </Button>
                  <Button
                    color={
                      this.state.gender.includes("f") ? "primary" : "secondary"
                    }
                    onClick={this.onChangeGender}
                    value={"f"}
                  >
                    Moterims
                  </Button>
                </ButtonGroup>
                <hr />

                <Label for="age">Amžiaus grupė</Label>
                <ButtonGroup id="age" className="d-flex">
                  <Button
                    color={
                      this.state.age.includes("child") ? "primary" : "secondary"
                    }
                    onClick={this.onChangeAge}
                    value={"child"}
                  >
                    Vaikai
                  </Button>

                  <Button
                    color={
                      this.state.age.includes("teen") ? "primary" : "secondary"
                    }
                    onClick={this.onChangeAge}
                    value={"teen"}
                  >
                    Paaugliai
                  </Button>
                  <Button
                    color={
                      this.state.age.includes("adult") ? "primary" : "secondary"
                    }
                    onClick={this.onChangeAge}
                    value={"adult"}
                  >
                    Suaugusieji
                  </Button>

                  <Button
                    color={
                      this.state.age.includes("senior")
                        ? "primary"
                        : "secondary"
                    }
                    onClick={this.onChangeAge}
                    value={"senior"}
                  >
                    Senjorai
                  </Button>
                </ButtonGroup>

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Pridėti
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  item: state.item
});
export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
