/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class PickPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      firstnameState: "",
      lastnameState: "",
      emailState: ""
    };
  }
  // function that returns true if value is email, false otherwise
  verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if value contains only numbers
  verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  };
  isValidated = () => {
    if (
      this.state.firstnameState === "has-success" &&
      this.state.lastnameState === "has-success" &&
      this.state.emailState === "has-success" &&
      this.state.phoneState === "has-success"
    ) {
      return true;
    } else {
      if (this.state.firstnameState !== "has-success") {
        this.setState({ firstnameState: "has-danger" });
      }
      if (this.state.lastnameState !== "has-success") {
        this.setState({ lastnameState: "has-danger" });
      }
      if (this.state.emailState !== "has-success") {
        this.setState({ emailState: "has-danger" });
      }
      if (this.state.phoneState !== "has-success") {
        this.setState({ phoneState: "has-danger" });
      }
      return false;
    }
  };
  render() {
    return (
      <>
        <h5 className="info-text">
          Let's start with the basic information (with validation)
        </h5>
        <Row className="justify-content-center mt-5">
        
        </Row>
      </>
    );
  }
}

export default PickPatient;
