 
import React from "react";

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

class Register extends React.Component {
  componentDidMount() {
    this.state = {
      username: '',
      password: '',
      phoneNumber: '',
      profilePicture: '',
      email: '',
      firstName: '',
      lastName: '',
      tos: false,
    };
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  handleChange(e){
    console.log({ [e.target.name]: e.target.value})
		this.setState({ [e.target.name]: e.target.value});
  }

  handleImageChange(imageUrl){
    this.setState({profilePicture: imageUrl});
  }

  render() {
    return (
      <>
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
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Username" name="username" type="text" onChange={this.handleChange.bind(this)}/>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="First Name" name="firstName" type="text" onChange={this.handleChange.bind(this)}/>
                      </InputGroup>
                      <InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Last name" name="lastName" type="text" onChange={this.handleChange.bind(this)}/>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" name="email" type="text" onChange={this.handleChange.bind(this)}/>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" name="password" type="password" onChange={this.handleChange.bind(this)}/>
                      </InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-chat-33" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Phone Number" name="phoneNumber" type="tel" onChange={this.handleChange.bind(this)}/>
                      </InputGroup>
                      <FormGroup check className="text-left">
                        <Label check>
                          <Input type="checkbox" name="tos" onChange={this.handleChange.bind(this)}/>
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
                      onClick={e => e.preventDefault()}
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

export default Register;
