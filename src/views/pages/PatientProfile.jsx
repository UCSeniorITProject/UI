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
import { getPatientByUserId, getPatientByPatientId } from "../../services/Patient";
import { getUserWithFilter } from "../../services/User";
import moment from "moment";

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
      profilePicture: '',
      truncatedSsn: '***-**-****'
    }
  }

    async componentDidMount(){
      const patientId = this.props.match.params.id;
      const patient = await getPatientByPatientId(patientId);
      const users = await getUserWithFilter({id: patient.userId});
      const user = users.users[0];
      await this.setState({
        firstName: user.firstName || patient.firstName,
        lastName: user.lastName || patient.lastName,
        address: patient.address,
        city: patient.city,
        state: patient.state,
        insurancePlanNo: patient.planNo,
        dob: patient.dob,
        email: user.email,
        username: user.username,
        ssn: patient.ssn,
        phoneNumber: user.phoneNumber,
        insuranceName: patient.insuranceName,
        insuranceCoPayAmount: patient.coPayAmount,
        zipCode: patient.zipCode,
        profilePicture: user.profilePicture,
        truncatedSsn: `***-**-${patient.ssn.substr(patient.ssn.length - 3, patient.ssn.length)}`,
      });
      if(user.profilePicture !== ''){
        this.refs.ImageUpload.setImage(user.profilePicture);
      }
    }

    handleImageChange(e) {

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
                            defaultValue={this.state.firstName}
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
                            onChange={e => this.change(e, "lastName", "length", 1)}
                            defaultValue={this.state.lastName}
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
                              onChange={e => this.change(e, "address", "length", 1)}
                              defaultValue={this.state.address}
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
                              defaultValue={this.state.zipCode}
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
                            type="text"
                            autoComplete="off"
                            defaultValue={this.state.state}
                            onChange={e =>
                              this.change(e, "state", "length", 1)
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
                            defaultValue={this.state.city}
                            onChange={e =>
                              this.change(
                                e,
                                "city",
                                "length",
                                1
                              )
                            }
                          />
                          {this.state.cityState ===
                          "has-danger" ? (
                            <label className="error">This field is required.</label>
                          ) : null}
                        </FormGroup>   
                      </Col>
                          
                      <Col md="6">
                          <FormGroup className={`has-label ${this.state.ssnState}`}>
                            <label>Social Security Number</label>
                            <Input
                              name="address"
                              type="text"
                              value={this.state.truncatedSsn}
                              readOnly
                            />
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
                              value={moment(this.state.dob).toDate()}
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
                            defaultValue={this.state.username}
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
                            defaultValue={this.state.email}
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
                              defaultValue={this.state.phoneNumber}
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
                              defaultValue={this.state.insuranceName}
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
                              defaultValue={this.state.insurancePlanNo}
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
                              defaultValue={this.state.insuranceCoPayAmount}
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