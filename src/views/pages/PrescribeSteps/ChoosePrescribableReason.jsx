import React from "react";
import {
	Col,
	Row
} from "reactstrap";
import Select from "react-select";
class PickPrescribableReasons extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			chosenPrescribables: [],
			selectedPrescribable: null,
		}
		const setStateInterval = setInterval(() => {
			const chosenPrescribables=this.props.getParentStateValue('prescribables');
			this.setState({chosenPrescribables: chosenPrescribables});
			if(chosenPrescribables.length !== 0 && this.props.getParentStateValue('isChoosePrescribablePageDone')){
				clearInterval(setStateInterval);
			}
		}, 1000);
	}

	componentDidMount(){
		this.setState({chosenPrescribables: this.props.getParentStateValue('prescribables')});
	}

	render(){
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
				</Row>
			</>
		)
	}
}

export default PickPrescribableReasons;