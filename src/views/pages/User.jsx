 
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
    };
  }

  handleChange(event, stateName, type, stateNameEqualTo, maxValue){
    console.log(this.state.tos)
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

  handleImageChange = imageUrl => {
    this.setState({profilePicture: imageUrl});
  }

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
                          <Input defaultValue={this.state.firstName} type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input defaultValue={this.state.lastName} type="text" />
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
                  <Button className="btn-fill" color="primary" type="submit">
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
