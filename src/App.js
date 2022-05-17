import React, { Component } from "react";
import { app } from "../services/flamelink";

export default class Blank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    app.content
      .getByField("blogPost", "slug", id, {
        populate: ["featuredImage"]
      })
      .then(post =>
        this.setState({
          data: Object.values(post)
        })
      );
  }
  render() {
    return <div />;
  }
}
