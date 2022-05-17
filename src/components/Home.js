import React, { Component } from "react";
import { app } from "../services/flamelink";
import MediaSlider from "./MediaSlider";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      // #2 set the state to empty array
      projects: [],
      isToggleOn: true
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  };

  doClick = () => {
    this.setState(prevState => ({
      isToggleOn1: !prevState.isToggleOn1
    }));
  };

  componentDidMount() {
    app.content.get("projects").then(projects =>
      this.setState({
        projects: projects
      })
    );
  }
  render() {
    const content = this.state.projects;
    return (
      <div className="home-wrap">
        {/* <div className={this.state.isToggleOn ? "opener hi" : "opener bye"}>
          <div className="center-text">
            <h1>
              Hello! This is katy what a fun and cool site omg so great good job
              k8
            </h1>
            <div onClick={this.handleClick} className="go-away">
              See Projects
            </div>
          </div>
        </div> */}
        <MediaSlider featured="featured" color={content.themeColor} />
        {/* <div className="project-wrapper">
          <div className="line-head">Web Design & Development</div>
          <ProjectPost projectType="web" />
          <div className="line-head">Illustration</div>
          <ProjectPost projectType="illustration" />
        </div> */}
      </div>
    );
  }
}
