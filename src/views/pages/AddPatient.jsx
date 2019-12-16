import BasicInfo from './AddPatientsSteps/BasicInfo';
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
const steps = [
  {
    stepName: "Basic Info",
    stepIcon: "tim-icons icon-single-02",
    component: BasicInfo,
  },
];

class AddPatient extends React.Component {
    render() {
      return (
        <>
          <div className="content">
            <Col className="mr-auto ml-auto" md="10">
              <ReactWizard
                validate
                steps={steps}
                navSteps
                validate
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