 
import { withRouter } from 'react-router';
import NotificationAlert from "react-notification-alert";
import React from "react";
import Axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      username: '',
      password: '',
		};
	}
  componentDidMount() {

		document.addEventListener('keyup', (e) => {
			if(e.keyCode === 13){
				this.handleSubmit();
			}
		});
    document.body.classList.toggle("login-page");
	}
	
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
	}
	
  handleChange(e){
		this.setState({ [e.target.name]: e.target.value});
	}

  async handleSubmit(){
    try {
      const tokens = await Axios.post(`${process.env.REACT_APP_API_URL}/api/security-management/login`, {
        authDetails: {
          username: this.state.username,
          password: this.state.password,
        }
      });

      localStorage.setItem("accessToken", tokens.data.accessToken);
      localStorage.setItem("refreshToken", tokens.data.refreshToken);
      this.props.history.push('/admin/user-profile');
    } catch (err) {
      var options = {};
      options = {
        place: 'tr',
        message: (
          <div>
            <div>
              Invalid username or password,
            </div>
          </div>
        ),
        type: 'danger',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
      };
      if(this.refs){
        this.refs.notificationAlert.notificationAlert(options);
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
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form">
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      src={require("assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h1">Log in</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Username" name="username" type="text" onChange={this.handleChange.bind(this)}/>
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" name="password" type="password" onChange={this.handleChange.bind(this)}/>
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="mb-3"
                      color="primary"
                      href=""
                      onClick={this.handleSubmit.bind(this)}
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link footer-link"
                          href="/auth/register"
                        >
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link footer-link"
                          href="/auth/register"
                        >
                          Forgot password?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
