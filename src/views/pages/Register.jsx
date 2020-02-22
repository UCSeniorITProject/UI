 
import React from "react";
import {getUserWithFilter} from '../../services/User';
import { withRouter } from 'react-router';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import NotificationAlert from "react-notification-alert";
import Axios from "axios";

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      phoneNumber: '',
      profilePicture: '',
      email: '',
      firstName: '',
      lastName: '',
      tos: false,
      registerEmailState: null,
      registerPhoneNumberState: null,
      registerPasswordState: null,
      registerUsernameState: null,
      registerFirstNameState: null,
      registerLastNameState: null,
      isFormValid: false,
    };
  }
  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  async handleRegister(){
    try {
      await Axios.post(`${process.env.REACT_APP_API_URL}/api/security-management/user`, {
        user: {
          username: this.state.username,
          password: this.state.password,
          phoneNumber: this.state.phoneNumber,
          profilePicture: this.state.profilePicture,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          active:'Y',
        }
      });
      this.props.history.push('/auth/login');
    } catch (err) {
    }
  }

  isFormValid(){
    return Object.entries(this.state).filter(x => x[0].includes('State') && (x[1] === null || x[0].includes('State')) && x[1].includes('has-danger')).length === 0;
  }

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
      if(this.refs !== undefined){
        this.refs.notificationAlert.notificationAlert(options);
      }
    }
  }

  async handleOnBlur(event, stateName){
    event.persist();
    const fieldIsUnique = await this.isFieldUnique(event);
    if(this.state[`${stateName}State`] === 'has-danger'){
      return;
    }
    if(!fieldIsUnique){
      var options = {};
      options = {
        place: 'tr',
        message: (
          <div>
            <div>
              A user is already registered with {event.target.value}!
            </div>
          </div>
        ),
        type: 'warning',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
      };
      if(this.refs){
        this.refs.notificationAlert.notificationAlert(options);
      }
      this.setState({ [stateName + "State"]: "has-danger" });
    } else {
      this.setState({ [stateName + "State"]: "has-success" });
    }
  }

  setIsFormValid(){
    this.setState({isFormValid: this.isFormValid()});
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

  handleChange(event, stateName, type, stateNameEqualTo, maxValue){
    this.setState({ [event.target.name]: event.target.value});
    switch (type) {
      case "email":
        const isValidEmail = this.verifyEmail(event.target.value)
        if (isValidEmail) {
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
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
      case "tel":
        if(this.verifyPhone(event.target.value)){
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      case "length": 
        if(this.verifyLength(event.target.value, 3)){
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      default:
        break;
    }
  }

  isValidated(){
    return this.isFormValid();
  }

  verifyPhone = value => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if(phoneRegex.test(value)){
      return true;
    }
    return false;
  };
  // function that returns true if value is email, false otherwise
  verifyEmail = value => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  handleImageChange = imageUrl => {
    this.setState({profilePicture: imageUrl});
  }

  render() {
    return (
      <>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto" md="5">
                <div className="info-area info-horizontal mt-5">
                  <div className="icon icon-warning">
                    <i className="tim-icons icon-lock-circle" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Compliance</h3>
                    <p className="description">
                      We are increasing the responsibility of organizations to prescribe responsibility.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-triangle-right-17" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">24/7 Accessibility</h3>
                    <p className="description">
                      No matter where you are, or when you are using it, SafeMeds is available.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-info">
                    <i className="tim-icons icon-delivery-fast" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Smart Trend Analyitics </h3>
                    <p className="description">
                      Realize negative trends within your organization before it is too late.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" md="7">
                <Card className="card-register card-white">
                  <CardHeader>
                    <CardImg
                      alt="..."
                      src={require("assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h4">Register</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form className="form">
                    <Col sm="9" md={{ size: 6, offset: 4 }}>
                      <ImageUpload
                        avatar
                        onChange={this.handleImageChange.bind(this)}
                        addBtnColor="default"
                        changeBtnColor="default"
                        className="pull-right"
                      />
                    </Col>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className={`tim-icons icon-single-02 ${this.state.registerUsernameState}`} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Username" name="username" type="text" onChange={e => this.handleChange(e, 'registerUsername', 'length')} onBlur={e =>this.handleOnBlur(e, 'registerUsername')}/>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className={`tim-icons icon-single-02 ${this.state.registerFirstNameState}`} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="First Name" name="firstName" type="text" onChange={e => this.handleChange(e, 'registerFirstName', 'length')}/>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className={`tim-icons icon-single-02 ${this.state.registerLastNameState}`} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Last name" name="lastName" type="text" onChange={e => this.handleChange(e, 'registerLastName', 'length')}/>
                      </InputGroup>
                      <InputGroup className={`has-label`}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className={`tim-icons icon-email-85 ${this.state.registerEmailState}`} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" name="email" type="email" onChange={e => this.handleChange(e, "registerEmail", "email")} onBlur={e =>this.handleOnBlur(e, 'registerEmail')}/>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className={`tim-icons icon-lock-circle ${this.state.registerPasswordState}`} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onClick={e => this.alertUserOfPasswordRequirements()}placeholder="Password" name="password" type="password" onChange={e => this.handleChange(e, "registerPassword", "password")}/>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className={`tim-icons icon-chat-33 ${this.state.registerPhoneNumberState}`} />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Phone Number" name="phoneNumber" type="text" onChange={e => this.handleChange(e, "registerPhoneNumber", "tel")} onBlur={e =>this.handleOnBlur(e, 'registerPhoneNumber')}/>
                      </InputGroup>
                      <FormGroup check className="text-left">
                        <Label check>
                        <Input type="checkbox" name="tos" onClick={e => this.setState({tos: true})}/>
                          <span className="form-check-sign" />I agree to the{" "}
                            terms and conditions.
                        </Label>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-round"
                      color="primary"
                      href="#pablo"
                      onClick={e => this.handleRegister()}
                      disabled={!this.state.isFormValid}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(Register);
