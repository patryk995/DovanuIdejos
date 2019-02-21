import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

export class Welcome extends Component {
  render() {
    return (
      <div className="gift-background text-white">
        <Container>
          <Row>
            <Col lg="7">
              <h1 className="display-5">
                Sveiki atvykę į Dovanų Idėjų Pasaulį!
              </h1>
              <p className="lead">
                Sukate galvą - ką gi padovanoti? Mes Jums padėsime išsirinkti
                tinkamiausią dovaną!
              </p>
              <hr className="my-2" />
              <p>
                Atsakę į kelis klausimus, pamatysite dovanų idėjų sarąšą. Jis
                bus sukurtas atsižvelgiant į Jūsų pateiktą informaciją. Galbūt
                surasite tai ko ilgai ieškojote, o gal pastebėsite idėjas,
                kurios įkvėps sugalvoti originaliausią dovaną!
              </p>
              <p className="lead">
                <Link to="/quiz" className="btn btn-primary btn-lg">
                  Pradėti!
                </Link>
              </p>
              <hr />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Welcome;
