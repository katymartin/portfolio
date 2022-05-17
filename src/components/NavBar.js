import React, { Component } from "react";
import { Link } from "react-router-dom";
import JotformEmbed from "react-jotform-embed";
import { app } from "../services/flamelink";
import _ from "lodash";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      k8YHeadshot: [],
      k8YBio: [],
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
      isToggleOn: !prevState.isToggleOn
    }));
  };

  componentDidMount() {
    app.content
      .get("k8YHeadshot", {
        populate: ["headshot"]
      })
      .then(k8YHeadshot =>
        this.setState({
          k8YHeadshot: k8YHeadshot
        })
      );

    app.content.get("k8YBio").then(k8YBio =>
      this.setState({
        k8YBio: k8YBio
      })
    );
  }

  render() {
    const shot = this.state.k8YHeadshot;
    const bio = this.state.k8YBio;
    return (
      <header>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-6jHF7Z3XI3fF4XZixAuSu0gGKrXwoX/w3uFPxC56OtjChio7wtTGJWRW53Nhx6Ev"
          crossorigin="anonymous"
        />

        <script
          data-search-pseudo-elements
          defer
          src="https://use.fontawesome.com/releases/latest/js/all.js"
          integrity="sha384-L469/ELG4Bg9sDQbl0hvjMq8pOcqFgkSpwhwnslzvVVGpDjYJ6wJJyYjvG3u8XW7"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Black+Han+Sans|Libre+Barcode+39+Extended+Text|Poppins"
          rel="stylesheet"
        />

        <div className="simple-nav" role="navigation" aria-label="navigation">
          <Link className="navbar-item n-dark" to="/home">
            <strong>katy martin</strong>
          </Link>
          <Link className="navbar-item" to="/project-index">
            web & design
          </Link>
          <a className="navbar-item" onClick={this.handleClick}>
            <i className="fas fa-envelope-square" />
          </a>
          <a
            className="navbar-item"
            href="https://www.linkedin.com/in/katymartin1/"
            target="_blank"
          >
            <i className="fab fa-linkedin" />
          </a>
        </div>
        <div className="foot-toggle" onClick={this.handleClick}>
          <h2 className={this.state.isToggleOn ? "open" : "close"}>
            {this.state.isToggleOn
              ? "About Me! And some contact info."
              : "Enough of that?"}
          </h2>
        </div>
        <div
          className={
            this.state.isToggleOn
              ? "foot-bye contact-foot"
              : "foot-hi contact-foot"
          }
        >
          <div className="foot-wrap">
            <div className="foot-bio">
              <i className="fas fa-times" onClick={this.handleClick} />
              <div dangerouslySetInnerHTML={{ __html: bio.bio }} />
              <div className="bio-links">
                {_.map(bio.bioLinks, bio => {
                  return (
                    <a
                      href={bio.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h2>
                        <i className={bio.linkIcon} />
                        {bio.linkCta}
                      </h2>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="foot-headshot">
              {_.map(shot.headshot, image => {
                return (
                  <img
                    key={image.url}
                    className=""
                    src={image.url}
                    alt="Katy Martin Headshot"
                  />
                );
              })}
            </div>
            <div className="foot-contact">
              <JotformEmbed src="https://form.jotform.com/90450170343144" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
