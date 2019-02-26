import React, { Component } from "react";
import {
  Badge,
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Col,
  Media
} from "reactstrap";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
const API = "http://dovanuidejos.bart.lt/wp";

export class Gift extends Component {
  state = {
    imgUrl: "",
    imgIsLoaded: false
  };
  componentDidMount() {
    const featured_media = this.props.gift.featured_media;
    axios.get(`${API}/wp-json/wp/v2/media/${featured_media}`).then(res => {
      this.setState({
        imgUrl: res.data.media_details.sizes.thumbnail.source_url,
        imgIsLoaded: true
      });
    });
  }
  render() {
    const gift = this.props.gift;
    return (
      <Media className="py-3 my-4 flex-column flex-sm-row">
        <Media
          className="mx-auto"
          left
          href="#"
          style={{ width: "182px", height: "182px" }}
        >
          {this.state.imgIsLoaded ? (
            <Media
              object
              src={this.state.imgUrl}
              alt={gift.title.rendered}
              className="d-block mx-auto p-3"
            />
          ) : (
            <LoadingSpinner />
          )}
        </Media>
        <Media body>
          <Media heading>{gift.title.rendered}</Media>
          <p dangerouslySetInnerHTML={{ __html: gift.excerpt.rendered }} />
          <h5>Vidutinė kaina: {gift.acf.price} &euro;</h5>
          {gift.acf.gender.map(gen => (
            <Badge key={gen + gift.id} color="secondary" className="ml-2">
              {gen === "m" ? "Vyrams" : gen === "f" ? "Moterims" : null}
            </Badge>
          ))}

          {gift.acf.age.map(age => (
            <Badge key={age + gift.id} color="secondary" className="ml-2">
              {age === "child"
                ? "Vaikams"
                : age === "teen"
                ? "Paugliams"
                : age === "adult"
                ? "Suaugusiems"
                : age === "senior"
                ? "Senjorams"
                : null}
            </Badge>
          ))}
        </Media>
      </Media>
    );
  }
}

export default Gift;
