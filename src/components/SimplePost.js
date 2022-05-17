import React, { Component } from "react";
import { app } from "../services/flamelink";
import _ from "lodash";

export default class SimplePost extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    app.content.get("projects").then(projects =>
      this.setState({
        projects: projects
      })
    );
  }

  renderPosts() {
    return _.map(this.state.projects, content => {
      const borderColor = {
        borderBottom: "5px solid " + content.themeColor
      };

      return (
        <a
          className="simple-post"
          href={`/project/${content.slug}`}
          style={borderColor}
        >
          <div className="simple-flex">
            <div className="post-button">
              <h2>{content.projectTitle}</h2>
            </div>
            <div>
              <i class="fas fa-angle-double-right" />
            </div>
          </div>
        </a>
      );
    });
  }

  render() {
    return (
      <div className="simple-wrap">
        <div className="line-head">Additional Projects</div>
        <div className="simple-flex">{this.renderPosts()}</div>
      </div>
    );
  }
}
