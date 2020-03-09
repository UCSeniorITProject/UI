import React from "react";
import {
	Col,
	Row
} from "reactstrap";
import Select from "react-select";
import { getPrescriptionReasonWithFilter } from "../../../services/PrescriptionReason";
class PickPrescribableReasons extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			chosenPrescribables: [],
			selectedPrescribable: null,
			selectedReasons: [],
			prescribableReasons: [],
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
					prescribableReasons: reasons.map(x => {return {label: x.reasonCode``, value: x.prescriptionReasonId}})
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
						You must select a reason to assign to a prescribable!
					</div>
				</div>
			),
			type: 'warning',
			icon: "tim-icons icon-bell-55",
			autoDismiss: 7,
		};
		this.refs.notificationAlert.notificationAlert(options);
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
							const prescribableReasonsMapped = this.state.selectedReasons.map(x => {
								if(x.id === this.selectedPrescribable.value){
									
								}
								return x;
							});

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
										this.setState({selectedPrescribable: value});
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