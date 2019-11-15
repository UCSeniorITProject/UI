 
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import ImageUpload from '../../components/CustomUpload/ImageUpload';
import {getUserWithFilter} from '../../services/User';
import jwtDecode from 'jwt-decode';
import Axios from "axios";

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      username: '',
      password: '',
      firstNameState: 'has-success',
      lastNameState: 'has-success',
      isFormValid: true,
    };
  }

  setIsFormValid(){
    this.setState({isFormValid: this.isFormValid()});
  }


  isFormValid(){
    return Object.entries(this.state).filter(x => x[0].includes('State') && x[1] ===null || x[0].includes('State') && x[1].includes('has-danger')).length === 0;
  }

  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  handleChange(event, stateName, type, stateNameEqualTo, maxValue){
    this.setState({ [event.target.name]: event.target.value});
    switch (type) {
      case "length": 
        if(this.verifyLength(event.target.value, 1)){
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
      default:
        break;
    }
  }

  handleImageChange = imageUrl => {
    this.setState({profilePicture: imageUrl});
  }
  
  updateUser = () => {
    Axios.post('')
  };

  async componentDidMount (){
    const user = await getUserWithFilter({id: jwtDecode(localStorage.getItem('accessToken')).userID});
    this.setState({
      firstName: user.users[0].firstName,
      lastName: user.users[0].lastName,
      phoneNumber: user.users[0].phoneNumber,
      email: user.users[0].email,
      username: user.users[0].username,
      profilePicture: user.users[0].profilePicture,
    });
    this.refs.ImageUpload.setImage(user.users[0].profilePicture);
  }
  render() {
    return (
      <>
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
                          <Input placeholder={this.state.email} disabled type="email" />
                        </FormGroup>
                      </Col>

                      <Col className="pr-md-1" md="3">
                        <FormGroup>
                        <ImageUpload
                          avatar
                          onChange={this.handleImageChange.bind(this)}
                          addBtnColor="default"
                          file={this.state.profilePicture}
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
                          <Input defaultValue={this.state.firstName} type="text" onChange={e => this.handleChange(e, 'firstName', 'length')}/>
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
                          <Input defaultValue={this.state.lastName} type="text" onChange={e => this.handleChange(e, 'lastName', 'length')}/>
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
                          <Input defaultValue={this.state.firstName} type="password" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Phone Number</label>
                          <Input defaultValue={this.state.phoneNumber} type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" disabled={!this.state.isFormValid}>
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
