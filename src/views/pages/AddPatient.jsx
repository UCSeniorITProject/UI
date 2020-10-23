import BasicInfo from "./AddPatientsSteps/BasicInfo";
import InsuranceInfo from "./AddPatientsSteps/InsuranceInfo";
import UserInfo from "./AddPatientsSteps/UserInfo";
import { withRouter } from "react-router";
import { Col } from "reactstrap";
import { createUser } from "../../services/User";
import ReactWizard from "react-bootstrap-wizard";
import React from "react";
import { createPatient } from "../../services/Patient";

class AddPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      email: "",
      phoneNumber: "",
      zipCode: "",
      ssn: "",
      gender: "M",
      dob: "",
      insuranceName: "",
      username: "",
      password: "",
      insuranceCoPayAmount: "",
      insurancePlanNo: "",
    };
  }

  onChildStateChange(stateName, value) {
    return this.setState({ [stateName]: value });
  }

  async onFinishButtonClick() {
    try {
      const userInfo = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
        profilePicture: "",
        active: "Y",
      };
      const user = await createUser(userInfo);
      const patientInfo = {
        address: this.state.address,
        city: this.state.city,
        insuranceCoPayAmount: this.state.insuranceCoPayAmount,
        dateOfBirth: this.state.dob,
        gender: this.state.gender,
        insuranceName: this.state.insuranceName,
        insurancePlanNo: this.state.insurancePlanNo,
        socialSecurityNumber: this.state.ssn,
        state: this.state.state,
        patientUserId: user.id,
        zipCode: this.state.zipCode,
        active: "Y",
      };
      const patient = await createPatient(patientInfo);
      this.props.history.push(`/admin/patient/profile/${patient.patientId}`);
    } catch (err) {
      var options = {};
      options = {
        place: "tr",
        message: (
          <div>
            <div>An error occured. Please try again later</div>
          </div>
        ),
        type: "error",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7,
      };
      this.refs.notificationAlert.notificationAlert(options);
    }
  }

  steps = [
    {
      stepName: "Basic Info",
      stepIcon: "tim-icons icon-single-02",
      component: BasicInfo,
      stepProps: {
        onChildStateChange: this.onChildStateChange.bind(this),
      },
    },
    {
      stepName: "User Info",
      stepIcon: "tim-icons icon-single-02",
      component: UserInfo,
      stepProps: {
        onChildStateChange: this.onChildStateChange.bind(this),
      },
    },
    {
      stepName: "Insurance Info",
      stepIcon: "tim-icons icon-credit-card",
      component: InsuranceInfo,
      stepProps: {
        onChildStateChange: this.onChildStateChange.bind(this),
      },
    },
  ];

  render() {
    return (
      <>
        <div className="content">
          <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
              validate
              steps={this.steps}
              onChildStateChange={this.onChildStateChange}
              finishButtonClick={this.onFinishButtonClick.bind(this)}
              title="Create a patient"
              description="This wizard will facilitate the patient creation process"
              headerTextCenter
              finishButtonClasses="btn-wd btn-info"
              nextButtonClasses="btn-wd btn-info"
              previousButtonClasses="btn-wd"
              progressbar
              color="blue"
            />
          </Col>
        </div>
      </>
    );
  }
}

export default withRouter(AddPatient);
