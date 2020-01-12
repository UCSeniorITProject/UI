import BasicInfo from './AddPatientsSteps/BasicInfo';
import InsuranceInfo from './AddPatientsSteps/InsuranceInfo';
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
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
        phone: '',
        zipCode: '',
        ssn: '',
        gender: '',
        insuranceName: '',
        insuranceCoPayAmount: '',
        insurancePlanNo: ''
      };
    }
    
    onChildStateChange(stateName, value){
      return this.setState({[stateName]: value});
    }

    async onFinishButtonClick(){
      console.log(this.state, this.props)
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

export default AddPatient;