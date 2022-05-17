import React, { Component } from "react";
import { app } from "../services/flamelink";
import SimplePost from "./SimplePost";

import _ from "lodash";

export default class Project extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    app.content
      .getByField("projects", "slug", this.props.match.params.id, {
        populate: [
          "deskFeature",
          {
            field: "projectContent",
            subFields: ["sectionMedia"]
          }
        ]
      })
      .then(projects =>
        this.setState({
          projects: Object.values(projects)
        })
      );
  }
  /// TOP SECTION
  renderFeaturedImage() {
    return _.map(this.state.projects, content => {
      const backColor = {
        backgroundColor: content.themeColor
      };
      return (
        <div>
          <div className="hproj-wrap" style={backColor}>
            <div className="hproj-info">
              <h1>{content.projectTitle}</h1>
              <div className="skill">
                {_.map(content.skillsUsed, skill => {
                  return (
                    <div>
                      <p style={backColor}>{skill.skillSelect}</p>
                    </div>
                  );
                })}
              </div>
              <div
                className="proj-desc"
                dangerouslySetInnerHTML={{ __html: content.projectDescription }}
              />
              <div className="info-bottom">
                <div className="tools">
                  {_.map(content.toolsUsed, tool => {
                    return (
                      <div>
                        <p>{tool.tools}</p>
                      </div>
                    );
                  })}
                </div>

                <div>
                  {content.liveSiteUrl && (
                    <a
                      href={content.liveSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-butt"
                    >
                      See Live Site
                    </a>
                  )}
                </div>
              </div>
            </div>

            {_.map(content.deskFeature, featuredImage => {
              return (
                <div
                  className="hproj-img"
                  style={{
                    backgroundImage: "url(" + featuredImage.url + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center right"
                  }}
                />
              );
            })}
          </div>
        </div>
      );
    });
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  //// LOWER SECTION

  render() {
    if (!this.state.projects) {
      return <div>Loading...</div>;
    }
    return _.map(this.state.projects, content => {
      const borderColor = {
        borderBottom: "5px solid " + content.themeColor
      };
      return (
        <section className="single-blog">
          <div>{this.renderFeaturedImage()}</div>
          <div className="project-content">
            {_.map(content.projectContent, post => {
              return (
                <div>
                  <div className="line-head" style={borderColor}>
                    {post.sectionHeader}
                  </div>

                  {_.map(post.sectionMedia, image => {
                    return (
                      <img
                        key={image.url}
                        className="sec-image"
                        src={image.url}
                        alt="Section Block"
                      />
                    );
                  })}
                </div>
              );
            })}
            <SimplePost />
          </div>
        </section>
      );
    });
  }
}
