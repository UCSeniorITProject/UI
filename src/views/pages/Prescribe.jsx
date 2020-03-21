import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";
import jwtDecode from 'jwt-decode';
// reactstrap components
import { Col } from "reactstrap";
import { withRouter } from 'react-router';
// wizard steps
import PickPrescribable from "./PrescribeSteps/ChoosePrescribable";
import PickPatient from "./PrescribeSteps/ChoosePatient";
import PickPrescribableReasons from "./PrescribeSteps/ChoosePrescribableReason";
import PickPharmacy from "./PrescribeSteps/ChoosePharmacy";
import {createPrescription, deletePrescription} from "../../services/Prescription";
import {createPrescriptionPrescribableDrug} from "../../services/PrescriptionPrescribableDrug"
import {createPrescriptionPrescribableDrugReason} from "../../services/PrescriptionPrescribableDrugReason";
import NotificationAlert from "react-notification-alert";

class Prescribe extends React.Component {
  constructor(props){
    super(props);
    this.state = {
			patientId: null,
			prescribables: [],
			isChoosePrescribablePageDone: false,
			prescribableReasonsMapped: [],
			pharmacyId: null,
			prescriptionStartDate: null,
			prescriptionEndDate: null,
			steps: [
				{
					stepName: "Pick Patient",
					stepIcon: "tim-icons icon-single-02",
					component: PickPatient,
					stepProps: {
						onChildStateChange: this.onChildStateChange.bind(this),
					},
				},
				{
					stepName: "Pick Prescribable",
					stepIcon: "tim-icons icon-bullet-list-67",
					component: PickPrescribable,
					stepProps: {
						onChildStateChange: this.onChildStateChange.bind(this),
					},
				},
				{
					stepName: "Pick Reasons",
					stepIcon: "tim-icons icon-book-bookmark",
					component: PickPrescribableReasons,
					stepProps: {
						onChildStateChange: this.onChildStateChange.bind(this),
						getParentStateValue: this.getParentStateValue.bind(this),
					},
				},
				{
					stepName: "Pick Pharmacy",
					stepIcon: "tim-icons icon-bank",
					component: PickPharmacy,
					stepProps: {
						onChildStateChange: this.onChildStateChange.bind(this),
						getParentStateValue: this.getParentStateValue.bind(this),
					},
				}
			],
		};
  }

	getParentStateValue(stateName){
		return this.state[stateName];
	}

	showSuccessfullySavedMessage(){
		var options = {};
		options = {
			place: 'tr',
			message: (
				<div>
					<div>
						Succesfully created the prescription! Redirecting to the patient profile page...
					</div>
				</div>
			),
			type: 'success',
			icon: "tim-icons icon-bell-55",
			autoDismiss: 7,
		};
		if(this.refs){
			this.refs.notificationAlert.notificationAlert(options);
		}
	}

	async finishButtonClick(){
		let prescription;
		try {
			//first create prescription
			const prescriptionToCreate = {
				doctorId: jwtDecode(localStorage.getItem('accessToken')).userID,
				patientId: this.state.patientId,
				active: 'Y',
				pharmacyId: this.state.pharmacyId,
			};
			prescription = await createPrescription(prescriptionToCreate);
			//create prescriptionPrescribableDrug
			const prescriptionPrescribableDrugsToCreate = [];
			for(let i = 0; i < this.state.prescribableReasonsMapped.length; i++){
				prescriptionPrescribableDrugsToCreate.push(createPrescriptionPrescribableDrug({
					prescriptionId: prescription.prescriptionId,
					prescribableId: this.state.prescribableReasonsMapped[i].prescribableId,
					patientId: this.state.patientId,
					active: 'Y',
					prescriptionStartDate: this.state.prescriptionStartDate,
					prescriptionEndDate: this.state.prescriptionEndDate,
				}, this.state.patientId));
			}
			const prescriptionPrescribableDrugs = await Promise.all(prescriptionPrescribableDrugsToCreate);
			//create prescriptionPrescribableDrugReason
			let prescriptionPrescribableDrugReasonsToCreate = [];
			this.state.prescribableReasonsMapped.forEach((x, index) => {
				x.reasons.forEach((y, index) => {
					prescriptionPrescribableDrugReasonsToCreate.push(createPrescriptionPrescribableDrugReason({
						prescriptionReasonId: 'value' in y ? y.value : y,
						prescriptionPrescribableDrugId: prescriptionPrescribableDrugs.filter(z=>z.prescribableId===x.prescribableId)[0].prescriptionPrescribableDrugId,
						active: 'Y',
					}));
				});
			});
			await Promise.all(prescriptionPrescribableDrugsToCreate);
			setTimeout(() => {
				this.props.history.push(`/patient/profile/${this.state.patientId}`);
			}, 3000);
		} catch (err){
			this.showNotAbleToBePrescribed();
			setTimeout(() => {
				window.location.reload();
			}, 3000)
		}
	}

  onChildStateChange(stateName, value){
    return this.setState({[stateName]: value});
	}
	
	showNotAbleToBePrescribed(){
		var options = {};
		options = {
			place: 'tr',
			message: (
				<div>
					<div>
						This patient already has a prescription for this drug! Redirecting...
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

  render() {
    return (
      <>
			  <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">
          <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
              validate
              steps={this.state.steps}
              title="Create a prescription"
              description="This wizard will facilitate the patient prescription process"
							headerTextCenter
							finishButtonClick={this.finishButtonClick.bind(this)}
							finishButtonClasses="btn-wd btn-info"
							finishButtonText="Prescribe"
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

export default withRouter(Prescribe);