import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  NavLink as NavLinkR
} from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    return (
      <Navbar color="dark" dark expand="sm">
        <Container>
          <NavbarBrand href="/">Davanų Idėjos</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLinkR
                  to="/"
                  exact
                  activeClassName="active"
                  className="nav-link"
                >
                  Pradinis
                </NavLinkR>
              </NavItem>

              <NavItem>
                <NavLinkR
                  to="/list"
                  activeClassName="active"
                  className="nav-link"
                >
                  Dovanų Sąrašas
                </NavLinkR>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AppNavbar;
