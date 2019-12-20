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
          <Col sm="5">
            <InputGroup
              className={classnames(this.state.firstnameState, {
                "input-group-focus": this.state.firstnameFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-single-02" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="firstname"
                placeholder="First Name"
                type="text"
                onChange={e => this.change(e, "firstname", "length", 1)}
                onFocus={e => this.setState({ firstnameFocus: true })}
                onBlur={e => this.setState({ firstnameFocus: false })}
              />
              {this.state.firstnameState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
            <InputGroup
              className={classnames(this.state.emailState, {
                "input-group-focus": this.state.emailFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-email-85" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="email"
                placeholder="Email"
                type="email"
                onChange={e => this.change(e, "email", "email")}
                onFocus={e => this.setState({ emailFocus: true })}
                onBlur={async e => {this.setState({ emailFocus: false }); await this.handleOnBlur(e, 'email');}}
              />
              {this.state.emailState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
          <Col sm="5">
            <InputGroup
              className={classnames(this.state.lastnameState, {
                "input-group-focus": this.state.lastnameFocus
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
                onChange={e => this.change(e, "lastname", "length", 1)}
                onFocus={e => this.setState({ lastnameFocus: true })}
                onBlur={e => this.setState({ lastnameFocus: false })}
              />
              {this.state.lastnameState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
            <InputGroup
              className={classnames(this.state.phoneState, {
                "input-group-focus": this.state.phoneFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-mobile" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="number"
                placeholder="Phone"
                type="number"
                onChange={e => this.change(e, "phone", "phone")}
                onFocus={e => this.setState({ phoneFocus: true })}
                onBlur={e => this.setState({ phoneFocus: false })}
              />
              {this.state.phoneState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
          <Col sm="5">
            <InputGroup
              className={classnames(
                this.state.addressState,
                {
                "input-group-focus": this.state.addressFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-square-pin" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="address"
                placeholder="Address"
                type="text"
                onChange={e => this.change(e, "address", "length", 1)}
                onFocus={e => this.setState({ addressFocus: true })}
                onBlur={e => this.setState({ addressFocus: false })}
              />
            </InputGroup>
            
          </Col>
          <Col sm="5">
            <InputGroup
              className={classnames(
                this.state.zipCodeState,
                {
                "input-group-focus": this.state.zipCodeFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-square-pin" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="zipCode"
                placeholder="Zip Code"
                type="text"
                onChange={e => this.change(e, "zipCode", "length", 1)}
                onFocus={e => this.setState({ zipCodeFocus: true })}
                onBlur={e => this.setState({ zipCodeFocus: false })}
              />
            </InputGroup>
            
          </Col>
          <Col sm="5">
            <InputGroup
              className={classnames(
                this.state.cityState,
                {
                "input-group-focus": this.state.cityFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-square-pin" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="city"
                placeholder="City"
                type="text"
                onChange={e => this.change(e, "city", "length", 1)}
                onFocus={e => this.setState({ cityFocus: true })}
                onBlur={e => this.setState({ cityFocus: false })}
              />
            </InputGroup>
            
          </Col>
          <Col sm="5">
            <InputGroup
              className={classnames(
                this.state.ssnState,
                {
                "input-group-focus": this.state.ssnFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-single-02" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="ssn"
                placeholder="Social Security Number"
                type="text"
                onChange={e => this.change(e, "ssn", "ssn")}
                onFocus={e => this.setState({ cityFocus: true })}
                onBlur={e => this.setState({ cityFocus: false })}
              />
            </InputGroup>
            
          </Col>
          <Col sm="5"></Col>
          <Col sm="5">
            <FormGroup check inline className="form-check-radio">
                <Label check>
                  <Input
                    defaultChecked
                    defaultValue="Male"
                    id="genderMale"
                    name="gender"
                    type="radio"
                  />
                  <span className="form-check-sign" />
                  Male
                </Label>
                <Label check>
                  <Input
                    defaultValue="Female"
                    id="genderFemale"
                    name="gender"
                    type="radio"
                  />
                  <span className="form-check-sign" />
                  Female
                </Label>
              </FormGroup>
          </Col>
        </Row>
      </>)
  }

  isValidated(){
    return this.state.isFormValid;
  }
}

export default withRouter(InsuranceInfo);