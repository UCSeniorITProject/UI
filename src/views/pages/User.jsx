import React from "react";
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import { getUserWithFilter } from "../../services/User";
import jwtDecode from "jwt-decode";
import Axios from "axios";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      username: "",
      password: "",
      firstNameState: "has-success",
      lastNameState: "has-success",
      passwordState: "has-success",
      phoneNumberState: "has-success",
      isFormValid: true,
    };
  }

  setIsFormValid() {
    this.setState({ isFormValid: this.isFormValid() });
  }

  isFormValid() {
    return (
      Object.entries(this.state).filter(
        (x) =>
          x[0].includes("State") &&
          (x[1] === null || x[0].includes("State")) &&
          x[1].includes("has-danger")
      ).length === 0
    );
  }

  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  handleChange(event, stateName, type, stateNameEqualTo, maxValue) {
    this.setState({ [event.target.name]: event.target.value });
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState(
            { [stateName + "State"]: "has-success" },
            this.setIsFormValid.bind(this)
          );
        } else {
          this.setState(
            { [stateName + "State"]: "has-danger" },
            this.setIsFormValid.bind(this)
          );
        }
        break;
      case "password":
        if (
          this.verifyLength(event.target.value, 6) &&
          event.target.value.toLowerCase() !== event.target.value
        ) {
          this.setState(
            { [stateName + "State"]: "has-success" },
            this.setIsFormValid.bind(this)
          );
        } else {
          this.setState(
            { [stateName + "State"]: "has-danger" },
            this.setIsFormValid.bind(this)
          );
        }
        break;
      case "tel":
        if (this.verifyPhone(event.target.value)) {
          this.setState(
            { [stateName + "State"]: "has-success" },
            this.setIsFormValid.bind(this)
          );
        } else {
          this.setState(
            { [stateName + "State"]: "has-danger" },
            this.setIsFormValid.bind(this)
          );
        }
        break;
      default:
        break;
    }
  }

  handleImageChange = (imageUrl) => {
    this.setState({ profilePicture: imageUrl });
  };

  verifyPhone = (value) => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (phoneRegex.test(value)) {
      return true;
    }
    return false;
  };

  async isFieldUnique(e) {
    try {
      const user = await getUserWithFilter({ [e.target.name]: e.target.value });
      return user.users.length === 0;
    } catch (err) {
      var options = {};
      options = {
        place: "tr",
        message: (
          <div>
            <div>An internal server error occured. Please try again later.</div>
          </div>
        ),
        type: "warning",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      this.refs.notificationAlert.notificationAlert(options);
    }
  }

  async handleOnBlur(event, stateName) {
    event.persist();
    const fieldIsUnique = await this.isFieldUnique(event);
    if (!fieldIsUnique) {
      var options = {};
      options = {
        place: "tr",
        message: (
          <div>
            <div>A user is already registered with {event.target.value}!</div>
          </div>
        ),
        type: "warning",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      this.refs.notificationAlert.notificationAlert(options);
      this.setState({ [stateName + "State"]: "has-danger" });
    } else {
      this.setState({ [stateName + "State"]: "has-success" });
    }
  }

  updateUser = async () => {
    try {
      const decodedUser = jwtDecode(localStorage.getItem("accessToken"));
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        profilePicture: this.state.profilePicture,
      };
      if (this.state.password !== "") {
        user.password = this.state.password;
      }
      await Axios.patch(
        `${process.env.REACT_APP_API_URL}/api/security-management/user/${decodedUser.userID}`,
        {
          user: user,
        }
      );
      var options = {};
      options = {
        place: "tr",
        message: (
          <div>
            <div>Succesfully updated your profile!</div>
          </div>
        ),
        type: "success",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      this.refs.notificationAlert.notificationAlert(options);
    } catch (err) {
      options = {
        place: "tr",
        message: (
          <div>
            <div>An internal server error occured. Please try again later.</div>
          </div>
        ),
        type: "warning",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      this.refs.notificationAlert.notificationAlert(options);
    }
  };

  async componentDidMount() {
    const user = await getUserWithFilter({
      id: jwtDecode(localStorage.getItem("accessToken")).userID,
    });
    if (user.users.length) {
      this.setState({
        firstName: user.users[0].firstName,
        lastName: user.users[0].lastName,
        phoneNumber: user.users[0].phoneNumber,
        email: user.users[0].email,
        username: user.users[0].username,
        profilePicture: user.users[0].profilePicture,
      });
      if (user.users[0].profilePicture !== "") {
        this.refs.ImageUpload.setImage(user.users[0].profilePicture);
      }
    }
  }
  render() {
    return (
      <>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue={this.state.username}
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Email address</label>
                          <Input
                            placeholder={this.state.email}
                            disabled
                            type="email"
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                          <ImageUpload
                            avatar
                            onChange={this.handleImageChange.bind(this)}
                            addBtnColor="default"
                            changeBtnColor="default"
                            className="pull-right"
                            ref="ImageUpload"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={this.state.firstName}
                            name="firstName"
                            type="text"
                            onChange={(e) =>
                              this.handleChange(e, "firstName", "length")
                            }
                          />
                          {this.state.firstNameState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid first name.
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue={this.state.lastName}
                            name="lastName"
                            type="text"
                            onChange={(e) =>
                              this.handleChange(e, "lastName", "length")
                            }
                          />
                          {this.state.lastNameState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid last name.
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            defaultValue="qweqweqweqweqwe"
                            name="password"
                            type="password"
                            onChange={(e) =>
                              this.handleChange(e, "password", "password")
                            }
                          />
                          {this.state.passwordState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid password. It must be more
                              than 6 digits and have one capital letter.
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Phone Number</label>
                          <Input
                            defaultValue={this.state.phoneNumber}
                            name="phoneNumber"
                            type="text"
                            onChange={(e) =>
                              this.handleChange(e, "phoneNumber", "tel")
                            }
                            onBlur={(e) => this.handleOnBlur(e, "phoneNumber")}
                          />
                          {this.state.phoneNumberState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid phone number.
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    disabled={!this.state.isFormValid}
                    onClick={(e) => this.updateUser()}
                  >
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
