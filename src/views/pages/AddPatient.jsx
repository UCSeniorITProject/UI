import BasicInfo from './AddPatientsSteps/BasicInfo';
import InsuranceInfo from './AddPatientsSteps/InsuranceInfo';
import UserInfo from './AddPatientsSteps/UserInfo';
import { withRouter } from 'react-router';
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import {createUser} from '../../services/User';
import ReactWizard from "react-bootstrap-wizard";
import React from "react";

class AddPatient extends React.Component {
    constructor(){
      super();
      this.state = {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        email: '',
        phoneNumber: '',
        zipCode: '',
        ssn: '',
        gender: 'Male',
        dob: '',
        insuranceName: '',
        username: '',
        password: '',
        insuranceCoPayAmount: '',
        insurancePlanNo: ''
      };
    }
    
    onChildStateChange(stateName, value){
      return this.setState({[stateName]: value});
    }

    async onFinishButtonClick(){
      const userInfo = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        profilePicture: '',
        active: 'Y',
      };
      console.log(this.state)
      const user = await createUser(userInfo);
      const patientInfo = {
        address: this.state.address,
        city: this.state.city,
        coPayAmount: this.state.insuranceCoPayAmount,
        dob: this.state.dob,
        gender: this.state.gender,
        insuranceName: this.state.insuranceName,
        planNo: this.state.insurancePlanNo,
        ssn: this.state.ssn,
        state: this.state.state,
        userId: 0,
        zipCode: this.state.zipCode
      };
    }

    steps = [
      {
        stepName: "Basic Info",
        stepIcon: "tim-icons icon-single-02",
        component: BasicInfo,
        stepProps: {
          onChildStateChange: this.onChildStateChange.bind(this),
        }
      },
      {
        stepName: "User Info",
        stepIcon: "tim-icons icon-single-02",
        component: UserInfo,
        stepProps: {
          onChildStateChange: this.onChildStateChange.bind(this),
        }
      },
      {
        stepName: "Insurance Info",
        stepIcon: "tim-icons icon-credit-card",
        component: InsuranceInfo,
        stepProps: {
          onChildStateChange: this.onChildStateChange.bind(this),
        },
      }
    ];

    render() {
      return (
        <>
          <div className="content">
            <Col className="mr-auto ml-auto" md="10">
              <ReactWizard
                validate
                steps={this.steps}
                navSteps
                validate
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