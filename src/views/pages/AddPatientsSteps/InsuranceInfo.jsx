import React from "react";
import { withRouter } from 'react-router';
import classnames from "classnames";
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Row,
  Col
} from "reactstrap";

class InsuranceInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFormValid: false,
      insuranceName: '',
      insuranceNameState: null,
    };
  }
  render () {
    return (<>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <h5 className="info-text">
          Let's start with the basic patient information 
        </h5>
        <Row className="justify-content-center mt-5">
          <Col sm="12">
          <InputGroup
              className={classnames(this.state.insuranceNameState, {
                "input-group-focus": this.state.insuranceNameState
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-caps-small" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="lastname"
                placeholder="Last Name"
                type="text"
                onChange={e => this.change(e, "insurance", "length", 1)}
                onFocus={e => this.setState({ insuranceFocus: true })}
                onBlur={e => this.setState({ insuranceFocus: false })}
              />
              {this.state.lastnameState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
        </Row>
      </>)
  }

  isValidated(){
    return this.state.isFormValid;
  }
}

export default withRouter(InsuranceInfo);