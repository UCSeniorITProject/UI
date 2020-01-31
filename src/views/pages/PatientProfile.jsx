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
import { getPatientByPatientId, patchPatient } from "../../services/Patient";
import { getUserWithFilter, patchUser } from "../../services/User";
import moment from "moment";
import NotificationAlert from "react-notification-alert";
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
      gender: '',
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
      truncatedSsn: '***-**-****',
      userId: '',
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
        gender: patient.gender,
        ssn: patient.ssn,
        phoneNumber: user.phoneNumber,
        insuranceName: patient.insuranceName,
        insuranceCoPayAmount: patient.coPayAmount,
        zipCode: patient.zipCode,
        profilePicture: user.profilePicture,
        truncatedSsn: `***-**-${patient.ssn !== null && patient.ssn !== '' ? patient.ssn.substr(patient.ssn.length - 3, patient.ssn.length) : ''}`,
        userId: user.id,
      });
      if(user.profilePicture !== ''){
        this.refs.ImageUpload.setImage(user.profilePicture);
      }
    }

    async onSaveClick(e){
      if(!this.isFormValid()){
        var options = {};
        options = {
          place: 'tr',
          message: (
            <div>
              <div>
                Please correct the validation errors before saving!
              </div>
            </div>
          ),
          type: 'warning',
          icon: "tim-icons icon-bell-55",
          autoDismiss: 7,
        };
        if(this.refs){
          this.refs.notificationAlert.notificationAlert(options);
        }
      } else {
        const patientInfoToSave = {
          address: this.state.address,
          city: this.state.city,
          zipCode: this.state.zipCode,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          coPayAmount: this.state.insuranceCoPayAmount,
          dob: this.state.dob,
          gender: this.state.gender,
          insuranceName: this.state.insuranceName,
          planNo: this.state.insurancePlanNo,
          ssn: this.state.ssn,
        };
        const userInfoToSave = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          password: this.state.password,
          profilePicture: this.state.profilePicture
        };
        try {
          await patchUser(this.state.userId,  userInfoToSave);
          await patchPatient(this.props.match.params.id, patientInfoToSave);
          var options = {};
          options = {
            place: 'tr',
            message: (
              <div>
                <div>
                  Succesfully saved the patient!
                </div>
              </div>
            ),
            type: 'success',
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7,
          };
          if(this.refs){
            this.refs.notificationAlert.notificationAlert(options);
          }
        } catch (err) {
          var options = {};
          options = {
            place: 'tr',
            message: (
              <div>
                <div>
                  An error occured while saving, please try again later.
                </div>
              </div>
            ),
            type: 'warning',
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7,
          };
          if(this.refs){
            this.refs.notificationAlert.notificationAlert(options);
          }
        }
      }
    }

    handleImageChange(imageUrl) {
      this.setState({profilePicture: imageUrl});
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

    async handleOnBlur(event, stateName){
      if(event.target.value ===  ''){
        this.change(event, stateName, 'length', 1);
        return;
      }
      if(this.state[`${stateName}State`] === 'has-danger'){
        return;
      }
      event.persist();
      const fieldIsUnique = await this.isFieldUnique(event);
      if(!fieldIsUnique || event.target.value.length === 0){
        if(!fieldIsUnique){
          var options = {};
          options = {
            place: 'tr',
            message: (
              <div>
                <div>
                  A patient is already registered with {event.target.value}!
                </div>
              </div>
            ),
            type: 'warning',
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7,
          };
          if(this.refs){
            this.refs.notificationAlert.notificationAlert(options);
          }
        }
        this.setState({ [stateName + "State"]: "has-danger" });
      } else {
        this.setState({ [stateName + "State"]: "has-success" });
      }
    }

    alertUserOfPasswordRequirements(){
      var options = {};
      options = {
        place: 'tr',
        message: (
          <div>
            <div>
              Your password must be 6 characters or more and include one capital later.
            </div>
          </div>
        ),
        type: 'info',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
      };
      this.refs.notificationAlert.notificationAlert(options);
    }

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
          if (this.verifyLength(event.target.value, 6)
          && event.target.value.toLowerCase() !== event.target.value) {
            this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
          } else {
            this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
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
        case "confirmPassword":
          if(this.state.password !== this.state.confirmPassword && this.state.confirmPassword.length !== 0){
            this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
          } else {
            this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
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
      this.setState({[stateName]: event.target.value});
    };
    async isFieldUnique(e){
      try {
        const user = await getUserWithFilter({[e.target.name]: e.target.value});
        return user.users.length === 0;
      } catch (err) {
        var options = {};
        options = {
          place: 'tr',
          message: (
            <div>
              <div>
                An internal server error occured. Please try again later.
              </div>
            </div>
          ),
          type: 'warning',
          icon: "tim-icons icon-bell-55",
          autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
      }
    }
    isFormValid(){
      return Object.entries(this.state).filter(x => x[1] !== null && x[0].includes('State') && x[1].includes('has-danger')).length === 0;
    }

    handleDateChange(e){
      this.setState({dob: e.toDate()});
    }
  
    setIsFormValid(){
      this.setState({isFormValid: this.isFormValid()});
    }
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
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
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
                              onChange={this.handleDateChange.bind(this)}
                              value={moment(this.state.dob).toDate()}
                              onBlur={async e => {await this.setState({dob: e.toDate()});}}
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
                            onClick={e => this.alertUserOfPasswordRequirements()}
                          />
                          {this.state.passwordState === "has-danger" ? (
                            <label className="error">This password does not meet the requirements.</label>
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
                            <label className="error">This password does not match.</label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                      <FormGroup className={`has-label`}>
                          <label>Gender</label>
                          <Input
                            name="gender"
                            type="text"
                            value={this.state.gender === 'M' ? 'Male' : 'Female'}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
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
                              onBlur={e => this.handleOnBlur(e, 'phoneNumber')}
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
                    <Button className="btn-fill pull-right" color="primary" onClick={e => this.onSaveClick(e)}>
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