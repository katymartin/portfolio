import React, { Component } from "react";
import { app } from "../services/flamelink";
import _ from "lodash";
import { Link } from "react-router-dom";

export default class ProjectPost extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    app.content
      .getByField("projects", "projectType", this.props.projectType, {
        populate: ["deskFeature"]
      })
      .then(projects =>
        this.setState({
          projects: projects
        })
      );
  }

  renderPosts() {
    if (!this.state.projects) {
      return <div>Loading...</div>;
    }
    return _.map(this.state.projects, content => {
      const borderColor = {
        borderBottom: "5px solid " + content.themeColor
      };
      return (
        <div className="block" style={borderColor}>
          <Link to={`/project/${content.slug}`}>
            <div className="block-content">
              <h1>{content.projectTitle}</h1>
              <h2>{content.blogSubtitle}</h2>
              <div className="proj-butt">See Project</div>
            </div>

            {_.map(content.deskFeature, image => {
              return (
                <div
                  className="block-back"
                  style={{
                    backgroundImage: "url(" + image.url + ")",
                    backgroundSize: "cover",
                    width: "100%",
                    height: "100%",
                    backgroundPosition: "center center"
                  }}
                />
              );
            })}
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="project-block">
        <div className="pblock-flex">{this.renderPosts()}</div>
      </div>
    );
  }
}
