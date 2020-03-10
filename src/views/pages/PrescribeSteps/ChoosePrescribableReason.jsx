import React from "react";
import {
	Col,
	Row
} from "reactstrap";
import Select from "react-select";
import { getPrescriptionReasonWithFilter } from "../../../services/PrescriptionReason";
import NotificationAlert from "react-notification-alert";

class PickPrescribableReasons extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			chosenPrescribables: [],
			selectedPrescribable: null,
			selectedReasons: [],
			prescribableReasons: [],
			prescribableReasonsMapped: [],
		}
		const setStateInterval = setInterval(() => {
			const chosenPrescribables=this.props.getParentStateValue('prescribables');
			this.setState({chosenPrescribables: chosenPrescribables});
			if(chosenPrescribables.length !== 0 && this.props.getParentStateValue('isChoosePrescribablePageDone')){
				clearInterval(setStateInterval);
			}
		}, 1000);
	}

	async componentDidMount(){
		const reasons = await getPrescriptionReasonWithFilter({active: 'Y'});
		this.setState(
				{
					chosenPrescribables: this.props.getParentStateValue('prescribables'),
					prescribableReasons: reasons.map(x => {return {label: x.reasonCode, value: x.prescriptionReasonId}})
				}
			);
	}

	showPickReason(){
		var options = {};
		options = {
			place: 'tr',
			message: (
				<div>
					<div>
						You must select a reason to assign to a prescribable for each prescribable!
					</div>
				</div>
			),
			type: 'warning',
			icon: "tim-icons icon-bell-55",
			autoDismiss: 7,
		};
		this.refs.notificationAlert.notificationAlert(options);
	}

	isValidated(){
		const isValid = this.state.prescribableReasonsMapped.filter(x=> x.reasons.length === 0).length === 0;
		console.log(this.state.prescribableReasonsMapped.filter(x=> x.reasons.length === 0))
		if(!isValid){
			this.showPickReason();
		}
		return isValid;
	}

	render(){
		let reasonSelect;
		if(this.state.selectedPrescribable !== null){
			reasonSelect = (
				<Select
					className="react-select info"
					classNamePrefix="react-select"
					placeholder="Pick Reasons To Assign Prescribable To"
					name="multipleSelect"
					closeMenuOnSelect={false}
					isMulti
					value={this.state.selectedReasons}
					onChange={value => {
							if(value.length === 0){
								this.showPickReason();
							}
							const currentlySelectedPrescribable = this.state.selectedPrescribable.value;
							let isPrescribableReasonFound = false;
							const prescribableReasonsMapped = this.state.prescribableReasonsMapped.length === 0 ? [{prescribableId: currentlySelectedPrescribable, reasons: value}] : this.state.prescribableReasonsMapped.map(x => {
								if(x.prescribableId === currentlySelectedPrescribable){
									isPrescribableReasonFound = true;
									return {prescribableId:currentlySelectedPrescribable, reasons: value};
								}
								return x;
							});
							if(!isPrescribableReasonFound &&  prescribableReasonsMapped.filter(x=>x.prescribableId===currentlySelectedPrescribable).length === 0){
								prescribableReasonsMapped.push({prescribableId:currentlySelectedPrescribable, reasons: value});
							}
							this.setState({prescribableReasonsMapped, selectedReasons: value});
						}   
					}
					options={[							{
						value: "",
						label: "Reason",
						isDisabled: true,
					}, ...this.state.prescribableReasons]}
				/>
			);
		} else {
			reasonSelect = null;
		}
		return (
			<>
				<div className="rna-container">
					<NotificationAlert ref="notificationAlert" />
				</div>
				<Row>
					<Col md="9">
							<h5 className="info-text float-left">
								<b>Pick Prescribable Reasons</b>
							</h5>
						</Col>
						<Col md="3">

						</Col>
						<Col md="3"></Col>
						<Col md="6">
							<Select
								className="react-select info"
								classNamePrefix="react-select"
								placeholder="Pick Prescribable To Assign Reason To(s)"
								name="multipleSelect"
								closeMenuOnSelect={false}
								value={this.state.selectedPrescribable}
								onChange={value => {
										if(value.length === 0){
											this.showPickPrescribableMessage();
										}
										const reasons = this.state.prescribableReasonsMapped.filter(x=>x.prescribableId===value.value);
										this.setState({selectedPrescribable: value, selectedReasons: reasons.length > 0 ? reasons[0].reasons : []});
									}   
								}
								options={[							{
									value: "",
									label: "Prescribables",
									isDisabled: true,
								}, ...this.state.chosenPrescribables]}
							/>
						</Col>
						<Col md="3"></Col>
						<Col md="3"></Col>
						<Col md="6">
								{reasonSelect}
						</Col>
				</Row>
			</>
		)
	}
}

export default PickPrescribableReasons;