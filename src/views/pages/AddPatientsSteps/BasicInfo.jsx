import React from "react";
import classnames from "classnames";
import {getUserWithFilter} from '../../../services/User';
import {getPatientWithFilter} from '../../../services/Patient';
import ReactDatetime from "react-datetime";
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label,
  FormGroup,
  Row,
  Col
} from "reactstrap";

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
      stateState: null,
      phoneNumber: "",
      phoneNumberState: null,
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      firstNameState: null,
      lastNameState: null,
      addressState: null,
      cityState: null,
      zipCodeState: null,
      ssnState: null,
      emailState: null,
      gender: "",
      city: "",
      streetAddress: "",
      zipCode: "",
      ssn: "",
      isFormValid: false,
    };
  }

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

  async setSSNState(ssn){
    const isUnique = this.isSSNUnique(ssn);
    if(!isUnique){
      var options = {};
      options = {
        place: 'tr',
        message: (
          <div>
            <div>
              A patient already exists with that social security number.
            </div>
          </div>
        ),
        type: 'warning',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
      };
      this.refs.notificationAlert.notificationAlert(options);
      this.setState({ssnState: "has-danger"});
    }
  }

  async isFieldUnique(e){
    try {
      const user = await getUserWithFilter({[e.target.name]: e.target.value});
      return user.users && user.users.length === 0;
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
      if(this.refs !== undefined){
        this.refs.notificationAlert.notificationAlert(options);
      }
    }
  }

  async isSSNUnique(ssn){
    const patient = await getPatientWithFilter({socialSecurityNumber: ssn});
    return patient.length === 0;
  }

  isFormValid(){
    return Object.entries(this.state).filter(x=> x[0].includes('State') && (x[1] === null || x[1] === 'has-danger')).length === 0;
  }

  setIsFormValid(){
    this.setState({isFormValid: this.isFormValid()});
  }
 
  // function that returns true if value is email, false otherwise
  verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value) && value.length !== 0) {
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
  verifyPhone = value => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if(phoneRegex.test(value)){
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
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      case "phone":
        if(this.verifyPhone(event.target.value)){
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      case "SSN":
        if(this.verifySSN(event.target.value)){
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      default:
        break;
    }

    if(type !== 'dob'){
      this.props.onChildStateChange(stateName, event.target.value || '');
      this.setState({ [stateName]: event.target.value || ''});
    } else {
      if(typeof e !== 'string'){
        this.props.onChildStateChange(stateName, event.toDate());
      } else {
        this.showInvalidDateMessage()
      }
    }
  };

  showInvalidDateMessage(){
    var options = {};
    options = {
      place: 'tr',
      message: (
        <div>
          <div>
            You entered an invalid date!
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
  
  verifySSN = (value) => {
    const ssnRegex = /^(\d{3}?\d{2}?\d{4}|XXX-XX-XXXX)$/;
    if (ssnRegex.test(value)) {
      return true;
    }
    return false;
  };

  isValidated = () => {
		const isFormValid = this.isFormValid();
		if(!isFormValid){
			const stateProps = Object.entries(this.state).filter(x=> x[0].includes('State') && (x[1] === null || x[1] === 'has-danger'));
			let invalidStateProps = {};
			stateProps.forEach(x => {
				invalidStateProps[x[0]] = 'has-danger';
			});
			this.setState({...invalidStateProps})
		}
    return isFormValid;
  };

  render() {
    return (
      <>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <h5 className="info-text">
          Let's start with the basic patient information 
        </h5>
        <Row className="justify-content-center mt-5">
          <Col sm="5">
            <InputGroup
              className={classnames(this.state.firstNameState, {
                "input-group-focus": this.state.firstNameFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-single-02" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="firstName"
                placeholder="First Name"
                type="text"
                onChange={e => this.change(e, "firstName", "length", 1)}
                onFocus={e => this.setState({ firstNameFocus: true })}
                onBlur={e => {this.setState({ firstNameFocus: false }); this.change(e, 'firstName', 'length', 1)}}
              />
              {this.state.firstNameState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
          <Col sm="5">
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
              className={classnames(this.state.lastNameState, {
                "input-group-focus": this.state.lastNameFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-caps-small" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="lastName"
                placeholder="Last Name"
                type="text"
                onChange={e => this.change(e, "lastName", "length", 1)}
                onFocus={e => this.setState({ lastNameFocus: true })}
                onBlur={e => {this.setState({ lastNameFocus: false }); this.change(e, 'lastName', 'length', 1);}}
              />
              {this.state.lastNameState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
          <Col sm="5">
            <InputGroup
              className={classnames(this.state.phoneNumberState, {
                "input-group-focus": this.state.phoneNumberFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-mobile" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="phoneNumber"
                placeholder="Phone"
                type="number"
                onChange={e => this.change(e, "phoneNumber", "phone")}
                onFocus={e => this.setState({ phoneNumberFocus: true })}
                onBlur={e => {this.setState({ phoneNumberFocus: false }); this.handleOnBlur(e, 'phoneNumber');}}
              />
              {this.state.phoneNumberState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
          <Col sm="3">
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
                onBlur={e =>{ this.setState({ addressFocus: false }); this.change(e, 'address', 'length', 1)}}
              />
              {this.state.addressState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
            
          </Col>
          <Col sm="3">
            <InputGroup
              className={classnames(
                this.state.stateState,
                {
                "input-group-focus": this.state.stateFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-square-pin" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="state"
                placeholder="State"
                type="text"
                onChange={e => this.change(e, "state", "length", 1)}
                onFocus={e => this.setState({ stateFocus: true })}
                onBlur={e =>{ this.setState({ stateFocus: false }); this.change(e, 'address', 'length', 1)}}
              />
              {this.state.stateState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
            
          </Col>
          <Col sm="4">
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
                onBlur={e => {this.setState({ zipCodeFocus: false }); this.change(e, 'zipCode', 'length', 1);}}
              />
              {this.state.zipCodeState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
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
                onBlur={e => {this.setState({ cityFocus: false }); this.change(e, 'city', 'length', 1);}}
              />
              {this.state.cityState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
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
                onChange={e => this.change(e, "ssn", "SSN")}
                onFocus={e => this.setState({ ssnFocus: true })}
                onBlur={async e => {this.setState({ ssnFocus: false }); this.setSSNState(e.target.value); this.change(e, 'ssn', 'length', 1);}}
              />
            </InputGroup>
            {this.state.ssnState === "has-danger" ? (
                <label className="error">This field is required.</label>
            ) : null}
          </Col>
          <Col sm="5">
            <FormGroup>
              <ReactDatetime
                inputProps={{
                  className: "form-control",
                  placeholder: "Date of Birth"
                }}
                onBlur={e => {
                  if(typeof e !== 'string') {
                    this.setState({dob: e.toDate()}); this.change(e, 'dob', 'dob',  0)
                  } else {
                    this.showInvalidDateMessage();
                  }
                }}
                timeFormat={false}
              />
            </FormGroup>
          </Col>
          <Col sm="5">
            <FormGroup check inline className="form-check-radio">
                <Label check>
                  <Input
                    defaultChecked
                    defaultValue="M"
                    id="genderMale"
                    name="gender"
                    type="radio"
                    onClick={e => this.setState({gender: 'M'})}
                  />
                  <span className="form-check-sign" />
                  Male
                </Label>
                <Label check>
                  <Input
                    defaultValue="F"
                    id="genderFemale"
                    name="gender"
                    type="radio"
                    onClick={e => this.setState({gender: 'F'})}
                  />
                  <span className="form-check-sign" />
                  Female
                </Label>
              </FormGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default BasicInfo;