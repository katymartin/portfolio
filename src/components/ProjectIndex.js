import React, { Component } from "react";

import ProjectPost from "./ProjectPost";

export default class ProjectIndex extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <section className="project-wrapper">
        <div className="line-head">Web Design & Development</div>
        <ProjectPost projectType="web" />
        <div className="line-head">... And some other stuff</div>
        <ProjectPost projectType="other" />
      </section>
    );
  }
}
