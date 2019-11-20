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
  render() {
    return (
      <>
        <h5 className="info-text">
          Start by picking a patient
        </h5>
        <Row className="justify-content-center mt-5">
        
        </Row>
      </>
    );
  }
}

export default PickPatient;
