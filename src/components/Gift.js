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
export class Gift extends Component {
  state = {
    imgUrl: "",
    imgIsLoaded: false
  };
  componentDidMount() {
    const featured_media = this.props.gift.featured_media;
    axios.get(`/wp-json/wp/v2/media/${featured_media}`).then(res => {
      this.setState({
        imgUrl: res.data.media_details.sizes.thumbnail.source_url,
        imgIsLoaded: true
      });
    });
  }
  render() {
    const gift = this.props.gift;
    return (
      <Media className="py-3 my-4">
        <Media left href="#">
          <Media
            object
            src={this.state.imgUrl}
            alt={gift.title.rendered}
            className="mr-3"
          />
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
