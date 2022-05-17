import React, { Component } from "react";
import { app } from "../services/flamelink";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import _ from "lodash";

export default class MediaSlider extends Component {
  constructor() {
    super();
    this.state = {
      // #2 set the state to empty array
      projects: []
    };
  }

  componentDidMount() {
    app.content
      .getByField("projects", "featured", this.props.featured, {
        populate: ["deskFeature"]
      })
      .then(projects =>
        this.setState({
          projects: projects
        })
      );
  }

  renderSlider() {
    return _.map(this.state.projects, content => {
      const backColor = {
        backgroundColor: content.themeColor
      };
      return (
        <div>
          <div className="hproj-wrap">
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
                className="text"
                dangerouslySetInnerHTML={{ __html: content.shortDescription }}
              />
              <Link to={`/project/${content.slug}`} className="proj-butt">
                See Project
                {this.props.cta}
              </Link>
            </div>
            <div className="hproj-img">
              {_.map(content.deskFeature, featuredImage => {
                return (
                  <div
                    style={{
                      backgroundImage: "url(" + featuredImage.url + ")",
                      backgroundSize: "cover",
                      width: "100%",
                      height: "100%",
                      backgroundPosition: "center center"
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="slide-color" style={backColor} />
        </div>
      );
    });
  }

  render() {
    var settings = {
      dots: true,
      arrows: true,
      infinite: true,
      autoPlay: true,
      speed: 500,
      draggable: true,
      accessibility: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <section className="home-slider">
        <div className="slider-wrap">
          <Slider {...settings}>{this.renderSlider()}</Slider>
        </div>
      </section>
    );
  }
}
