import React from "react";
import classnames from "classnames";
import NotificationAlert from "react-notification-alert";
import {getUserWithFilter} from '../../../services/User';
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class UserInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFormValid: false,
      username: '',
      usernameState: null,
      password: '',
      passwordState: null,
      confirmPassword: '',
      confirmPasswordState: null,
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

  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  change = async (event, stateName, type, stateNameEqualTo, maxValue) => {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
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
      case "confirmPassword":
        if(this.state.password !== this.state.confirmPassword && this.state.confirmPassword.length !== 0){
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        }
        break;
      default:
        break;
    }

    if(event.target.value){
      this.props.onChildStateChange(stateName, event.target.value);
    }
    this.setState({ [stateName]: event.target.value });
  };

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

  setIsFormValid(){
    this.setState({isFormValid: this.isFormValid()});
  }

  isFormValid(){
    return Object.entries(this.state).filter(x => x[0].includes('State') && x[1] ===null || x[0].includes('State') && x[1].includes('has-danger')).length === 0;
  }

  isValidated = () => {
    return this.isFormValid();
  };

  render () {
    return (<>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <h5 className="info-text">
          Now, onto the insurance information.
        </h5>
        <Row className="justify-content-center mt-5">
          <Col sm="6">
          <InputGroup
              className={classnames(this.state.usernameState, {
                "input-group-focus": this.state.usernameFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-caps-small" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="username"
                placeholder="Username"
                type="text"
                onChange={e => this.change(e, "username", "length", 1)}
                onFocus={e => this.setState({ usernameFocus: true })}
                onBlur={e =>{ this.setState({ usernameFocus: false }); this.handleOnBlur(e, 'username')}}
              />
              {this.state.usernameState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
          <Col sm="6">
            <InputGroup
                className={classnames(this.state.passwordState, {
                  "input-group-focus": this.state.passwordFocus
                })}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="tim-icons icon-badge" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  onClick={e => this.alertUserOfPasswordRequirements()}
                  onChange={e => this.change(e, "password", "password")}
                  onFocus={e => this.setState({ passswordFocus: true })}
                  onBlur={e => this.setState({ passwordFocus: false })}
                />
                {this.state.passwordState === "has-danger" ? (
                  <label className="error">This field is required.</label>
                ) : null}
              </InputGroup>
          </Col>
          <Col sm="6"></Col>
          <Col sm="6">
            <InputGroup
                className={classnames(this.state.confirmPasswordState, {
                  "input-group-focus": this.state.confirmPasswordFocus
                })}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="tim-icons icon-badge" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={e => this.change(e, "confirmPassword", "confirmPassword")}
                  onFocus={e => this.setState({ confirmPasswordFocus: true })}
                  onBlur={e =>{ this.setState({ confirmPasswordFocus: false }); this.change(e, "confirmPassword", "confirmPassword");}}
                />
                {this.state.confirmPasswordState === "has-danger" ? (
                  <label className="error">Passwords do not match</label>
                ) : null}
              </InputGroup>
          </Col>
        </Row>
      </>)
  }
}

export default UserInfo;