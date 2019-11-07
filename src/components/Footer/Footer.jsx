
/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <ul className="nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href=""
              >
                About us
              </a>
            </li>{" "}
            <li className="nav-item">
              <a className="nav-link" href="">
                Blog
              </a>
            </li>
          </ul>
          <div className="copyright">
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
