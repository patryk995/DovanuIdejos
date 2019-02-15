import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Welcome extends Component {
  render() {
    return (
      <>
        <h1 className="display-5">Sveiki atvykę į Dovanų Idėjų Pasaulį!</h1>
        <p className="lead">
          Sukate galvą - ką gi padovanoti? Mes Jums padėsime išsirinkti
          tinkamiausią dovaną!
        </p>
        <hr className="my-2" />
        <p>
          Atsakę į kelis klausimus, pamatysite dovanų idėjų sarąšą. Jis bus
          sukurtas atsižvelgiant į Jūsų pateiktą informaciją. Galbūt pamatysite
          tai kas labai tiks tam žmoguui, o gal jame surasite idėjas kurios
          įkvėps sugalvoti originaliausią dovaną!
        </p>
        <p className="lead">
          <Link to="/quiz" className="btn btn-primary">
            Pradėti!
          </Link>
        </p>
        <hr />
      </>
    );
  }
}

export default Welcome;
