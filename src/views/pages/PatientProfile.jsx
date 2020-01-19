import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import ReactDatetime from "react-datetime";
import ImageUpload from '../../components/CustomUpload/ImageUpload';

class PatientProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      firstNameState: null,
      lastName: '',
      lastNameState: null,
      address: '',
      addressState: null,
      city: '',
      cityState: null,
      email: '',
      emailState: null,
      phoneNumber: '',
      phoneNumberState: null,
      zipCode: '',
      zipCodeState: null,
      ssn: '',
      ssnState: null,
      gender: 'M',
      genderState: null,
      dob: '',
      dobState: null,
      insuranceName: '',
      insuranceNameState: null,
      username: '',
      usernameState: null,
      password: '',
      passwordState: null,
      confirmPassword: '',
      confirmPasswordState: null,
      insuranceCoPayAmount: '',
      insuranceCoPayAmountState: null,
      insurancePlanNo: '',
      insurancePlanNoState: null,
      state: '',
      stateState:null,
    }
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
    // function that verifies if two strings are equal
    compare = (string1, string2) => {
      if (string1 === string2) {
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
    // verifies if value is a valid URL
    verifyUrl = value => {
      try {
        new URL(value);
        return true;
      } catch (_) {
        return false;
      }
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
        case "password":
          if (this.verifyLength(event.target.value, 1)) {
            this.setState({ [stateName + "State"]: "has-success" });
          } else {
            this.setState({ [stateName + "State"]: "has-danger" });
          }
          break;
        case "equalTo":
          if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
            this.setState({ [stateName + "State"]: "has-success" });
            this.setState({ [stateNameEqualTo + "State"]: "has-success" });
          } else {
            this.setState({ [stateName + "State"]: "has-danger" });
            this.setState({ [stateNameEqualTo + "State"]: "has-danger" });
          }
          break;
        case "number":
          if (this.verifyNumber(event.target.value)) {
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
        case "max-length":
          if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
            this.setState({ [stateName + "State"]: "has-success" });
          } else {
            this.setState({ [stateName + "State"]: "has-danger" });
          }
          break;
        case "url":
          if (this.verifyUrl(event.target.value)) {
            this.setState({ [stateName + "State"]: "has-success" });
          } else {
            this.setState({ [stateName + "State"]: "has-danger" });
          }
          break;
        case "min-value":
          if (
            this.verifyNumber(event.target.value) &&
            event.target.value >= stateNameEqualTo
          ) {
            this.setState({ [stateName + "State"]: "has-success" });
          } else {
            this.setState({ [stateName + "State"]: "has-danger" });
          }
          break;
        case "max-value":
          if (
            this.verifyNumber(event.target.value) &&
            event.target.value <= stateNameEqualTo
          ) {
            this.setState({ [stateName + "State"]: "has-success" });
          } else {
            this.setState({ [stateName + "State"]: "has-danger" });
          }
          break;
        case "range":
          if (
            this.verifyNumber(event.target.value) &&
            event.target.value >= stateNameEqualTo &&
            event.target.value <= maxValue
          ) {
            this.setState({ [stateName + "State"]: "has-success" });
          } else {
            this.setState({ [stateName + "State"]: "has-danger" });
          }
          break;
        case "phone":
          if(this.verifyPhone(event.target.value)){
            this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
          } else {
            this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
          }
          break;
        default:
          break;
      }
      this.setState({ [stateName]: event.target.value });
    };
    registerClick = () => {
      if (this.state.registerEmailState === "") {
        this.setState({ registerEmailState: "has-danger" });
      }
      if (
        this.state.registerPasswordState === "" ||
        this.state.registerConfirmPasswordState === ""
      ) {
        this.setState({ registerPasswordState: "has-danger" });
        this.setState({ registerConfirmPasswordState: "has-danger" });
      }
    };
    loginClick = () => {
      if (this.state.loginFullNameState === "") {
        this.setState({ loginFullNameState: "has-danger" });
      }
      if (this.state.loginEmailState === "") {
        this.setState({ loginEmailState: "has-danger" });
      }
      if (this.state.loginPasswordState === "") {
        this.setState({ loginPasswordState: "has-danger" });
      }
    };
    handleImageChange = e => {

    }
    typeClick = () => {
      if (this.state.requiredState === "") {
        this.setState({ requiredState: "has-danger" });
      }
      if (this.state.emailState === "") {
        this.setState({ emailState: "has-danger" });
      }
      if (this.state.numberState === "") {
        this.setState({ numberState: "has-danger" });
      }
      if (this.state.urlState === "") {
        this.setState({ urlState: "has-danger" });
      }
      if (this.state.sourceState === "" || this.state.destinationState === "") {
        this.setState({ sourceState: "has-danger" });
        this.setState({ destinationState: "has-danger" });
      }
    };
    rangeClick = () => {
      if (this.state.minLengthState === "") {
        this.setState({ minLengthState: "has-danger" });
      }
      if (this.state.maxLengthState === "") {
        this.setState({ maxLengthState: "has-danger" });
      }
      if (this.state.rangeState === "") {
        this.setState({ rangeState: "has-danger" });
      }
      if (this.state.minValueState === "") {
        this.setState({ minValueState: "has-danger" });
      }
      if (this.state.maxValueState === "") {
        this.setState({ maxValueState: "has-danger" });
      }
      if (this.state.minState === "") {
        this.setState({ minState: "has-danger" });
      }
      if (this.state.maxState === "") {
        this.setState({ maxState: "has-danger" });
      }
    };

    verifyPhone = value => {
      const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
      if(phoneRegex.test(value)){
        return true;
      }
      return false;
    };

  render(){
    return (
      <>
        <div className="content">
          <Row>
            <Col md="6">
              <Form id="RegisterValidation">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Basic Info</CardTitle>
                  </CardHeader>
                  <CardBody>

                    <Row>
                      <Col md="6">
                        <FormGroup className={`has-label ${this.state.firstNameState}`}>
                          <label>First Name</label>
                          <Input
                            name="firstname"
                            type="text"
                            onChange={e => this.change(e, "firstName", "length", '1')}
                          />
                          {this.state.firstNameState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid name
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className={`has-label ${this.state.lastNameState}`}>
                          <label>Last Name</label>
                          <Input
                            name="lastname"
                            type="text"
                            onChange={e => this.change(e, "registerEmail", "email")}
                          />
                          {this.state.lastNameState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid name.
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup className={`has-label ${this.state.addressState}`}>
                            <label>Street Address</label>
                            <Input
                              name="address"
                              type="text"
                              onChange={e => this.change(e, "registerAddress", "length", 1)}
                            />
                            {this.state.registerEmailState === "has-danger" ? (
                              <label className="error">
                                Please enter a valid address.
                              </label>
                            ) : null}
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup
                          className={`has-label ${this.state.zipCodeState}`}
                          >
                            <label>Zip Code</label>
                            <Input
                              id="zipCode"
                              name="zipcode"
                              type="text"
                              onChange={e =>
                                this.change(
                                  e,
                                  "zipCode",
                                  "length",
                                  1
                                )
                              }
                            />
                            {this.state.zipCodeState ===
                            "has-danger" ? (
                              <label className="error">This field is required.</label>
                            ) : null}
                          </FormGroup> 
                      </Col>

                      <Col md="6">  
                        <FormGroup className={`has-label ${this.state.stateState}`}>
                          <label>State</label>
                          <Input
                            id="state"
                            name="state"
                            type="teext"
                            autoComplete="off"
                            onChange={e =>
                              this.change(e, "registerPassword", "password")
                            }
                          />
                          {this.state.stateState === "has-danger" ? (
                            <label className="error">Please enter a valid state.</label>
                          ) : null}
                        </FormGroup>     
                      </Col>

                      <Col md="6">
                        <FormGroup
                        className={`has-label ${this.state.cityState}`}
                        >
                          <label>City</label>
                          <Input
                            id="city"
                            name="city"
                            type="text"
                            autoComplete="off"
                            onChange={e =>
                              this.change(
                                e,
                                "city",
                                "length",
                                1
                              )
                            }
                          />
                          {this.state.registerConfirmPasswordState ===
                          "has-danger" ? (
                            <label className="error">This field is required.</label>
                          ) : null}
                        </FormGroup>   
                      </Col>
                          
                      <Col md="6">
                          <FormGroup className={`has-label ${this.state.addressState}`}>
                            <label>Social Security Number</label>
                            <Input
                              name="address"
                              type="text"
                              onChange={e => this.change(e, "registerAddress", "length", 1)}
                            />
                            {this.state.registerEmailState === "has-danger" ? (
                              <label className="error">
                                Please enter a valid address.
                              </label>
                            ) : null}
                        </FormGroup> 
                      </Col>

                      <Col md="6">
                        <FormGroup className='has-label'>
                            <label>Date of Birth</label>
                            <ReactDatetime
                              inputProps={{
                                className: "form-control",
                                placeholder: "Date of Birth"
                              }}
                              onBlur={e => {this.setState({dob: e.toDate()}); this.change(e, 'dob', 'dob',  0)}}
                              timeFormat={false}
                            />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Form>
            </Col>

            <Col md="6">
              <Form>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">User Info</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="12">
                        <FormGroup className={`has-label`}>
                          <label>Username</label>
                          <Input
                            name="fullname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup className={`has-label`}>
                          <label>Email Address</label>
                          <Input
                            name="email"
                            type="email"
                            readOnly
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup className={`has-label ${this.state.passwordState}`}>
                          <label>Password</label>
                          <Input
                            name="password"
                            type="password"
                            autoComplete="off"
                            onChange={e =>
                              this.change(e, "password", "password")
                            }
                          />
                          {this.state.passwordState === "has-danger" ? (
                            <label className="error">This field is required.</label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className={`has-label ${this.state.confirmPasswordState}`}>
                          <label>Confirm Password</label>
                          <Input
                            name="password"
                            type="password"
                            autoComplete="off"
                            onChange={e =>
                              this.change(e, "confirmPassword", "password")
                            }
                          />
                          {this.state.confirmPasswordState === "has-danger" ? (
                            <label className="error">This field is required.</label>
                          ) : null}
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup className={`has-label ${this.state.phoneNumberState}`}>
                            <label>Phone Number</label>
                            <Input
                              name="phoneNumber"
                              type="text"
                              autoComplete="off"
                              onChange={e =>
                                this.change(e, "phoneNumber", "phone")
                              }
                            />
                            {this.state.phoneNumberState === "has-danger" ? (
                              <label className="error">This field is required.</label>
                            ) : null}
                          </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Form>
            </Col>

            <Col md="6">
              <Form>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Insurance Info</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Col md="12">
                        <FormGroup className={`has-label ${this.state.insuranceNameState}`}>
                            <label>Insurance Name</label>
                            <Input
                              name="insurancename"
                              type="text"
                              autoComplete="off"
                              onChange={e =>
                                this.change(e, "insuranceName", "length", 1)
                              }
                            />
                            {this.state.insuranceNameState === "has-danger" ? (
                              <label className="error">This field is required.</label>
                            ) : null}
                          </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup className={`has-label ${this.state.insurancePlanNoState}`}>
                            <label>Insurance Plan Number</label>
                            <Input
                              name="insuranceplanno"
                              type="text"
                              autoComplete="off"
                              onChange={e =>
                                this.change(e, "insurancePlanNo", "length", 1)
                              }
                            />
                            {this.state.insurancePlanNoState === "has-danger" ? (
                              <label className="error">This field is required.</label>
                            ) : null}
                          </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup className={`has-label ${this.state.insuranceCoPayAmountState}`}>
                            <label>Insurance Co-Pay Amount</label>
                            <Input
                              name="insurancecopayamount"
                              type="text"
                              autoComplete="off"
                              onChange={e =>
                                this.change(e, "insuranceCoPayAmount", "length", 1)
                              }
                            />
                            {this.state.insuranceCoPayAmountState === "has-danger" ? (
                              <label className="error">This field is required.</label>
                            ) : null}
                          </FormGroup>
                      </Col>
                  </CardBody>
                </Card>
              </Form>
            </Col>

            <Col md="6">
              <Form>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Profile</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="4">
                      </Col>
                      <Col md="8">
                        <FormGroup>
                          <ImageUpload
                            avatar
                            onChange={this.handleImageChange.bind(this)}
                            addBtnColor="default"
                            changeBtnColor="default"
                            ref="ImageUpload"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Button className="btn-fill pull-right" color="primary" type="submit">
                      Save Patient
                    </Button>
                </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default PatientProfile;