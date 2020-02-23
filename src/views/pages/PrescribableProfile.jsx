import React from "react";
import NotificationAlert from "react-notification-alert";
import {patchPrescribable, getPrescribableWithFilter} from "../../services/Prescribable";
import {getDrugWithFilter} from "../../services/Drug";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import Select from "react-select";
class PrescribableProfile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dosage: '',
			dosageState: null,
			dosageUnit: '',
			dosageUnitState: null,
			dosageFrequency: '',
			dosageFrequencyState: null,
			minWeight: '',
			minWeightState: null,
			requiredGender: null,
			requiredGenderState: null,
			drugId: this.props.match.params.id,
			isPrescribableFormValid: true,
			name: '',
			nameState: null,
			drugFrequencySelect: null,
			dosageUnitSelect: null,
			parentDrugName: '',
		}
	}

	setIsFormValid(){
    this.setState({isPrescribableFormValid: this.isFormValid()});
  }

	change = (event, stateName, type, stateNameEqualTo) => {
		switch (type) {
			case "length":
				if (this.verifyLength(event.target.value, stateNameEqualTo)) {
					this.setState( {  [stateName + "State"]: "has-success", [stateName]: event.target.value || '' }, this.setIsFormValid.bind(this));
				} else {
					this.setState({ [stateName + "State"]: "has-danger", [stateName]: event.target.value || '' }, this.setIsFormValid.bind(this));
				}
				break;
			default:
        break;
		}
	};

  isFormValid(){
		return Object.entries(this.state).filter(x => x[0].includes('State') && x[1] !== null && x[1] === 'has-danger').length === 0;
	}
	
	verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

	async componentDidMount(){
		const prescribableId = this.props.match.params.id;
		try {
			const prescribable = await getPrescribableWithFilter({prescribableId});
			const drug = await getDrugWithFilter({drugId: prescribable[0].drugId})
			this.setState({
				dosage: prescribable[0].dosage,
				dosageState: null,
				dosageUnit: prescribable[0].dosageUnit,
				dosageUnitSelect: {
					label: prescribable[0].dosageUnit,
					value: prescribable[0].dosageUnit,
				},
				dosageFrequency: prescribable[0].dosageFrequency,
				dosageFrequencySelect: {
					label: prescribable[0].dosageFrequency,
					value: prescribable[0].dosageFrequency,
				},
				minWeight: prescribable[0].minWeight,
				minWeightState: null,
				requiredGender: prescribable[0].requiredGender === 'B' || prescribable[0].requiredGender === '' ? 'B' : prescribable[0].requiredGender,
				name: prescribable[0].name,
				nameState: null,
				parentDrugName: drug[0].name,
			});
		} catch (err) {
      this.showInternalServerErrorMessage();
		}
	}

	async updatePrescribable(){
		try {
			const prescribableInfo = {
				dosage: this.state.dosage,
				dosageUnit: this.state.dosageUnit,
				dosageFrequency: this.state.dosageFrequency,
				minWeight: this.state.minWeight,
				requiredGender: this.state.requiredGender,
				name: this.state.name,
			};

			await patchPrescribable(this.props.match.params.id, prescribableInfo);
			var options = {};
			options = {
				place: 'tr',
				message: (
					<div>
						<div>
							Succesfully updated the prescribable!
						</div>
					</div>
				),
				type: 'Success',
				icon: "tim-icons icon-bell-55",
				autoDismiss: 7
			};
			this.refs.notificationAlert.notificationAlert(options);
		} catch (err) {
			this.showInternalServerErrorMessage();
		}
	}

	showInternalServerErrorMessage(){
    var options = {};
    options = {
      place: 'tr',
      message: (
        <div>
          <div>
            An error occured. Please try again later
          </div>
        </div>
      ),
      type: 'error',
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

	render(){
		return (
			<>
			<div className="rna-container">
				<NotificationAlert ref="notificationAlert" />
			</div>
			<div className="content">
				<Row>
					<Col md="12">
						<Card>
                <CardHeader>
                  <CardTitle tag="h4">Update Prescribable (Parent Drug: {this.state.parentDrugName})</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="3">
                        <FormGroup className={`has-label ${this.state.dosageState}`}>
                          <label>Dosage</label>
                          <Input
                            name="dosage"
														type="text"
														value={this.state.dosage}
                            onChange={e => this.change(e, "dosage", "length", '1')}
                          />
                          {this.state.dosageState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid dosage amount
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup className={`has-label`}>
                          <label>Dosage Unit</label>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Dosage Unit"
                            name="select"
														closeMenuOnSelect={false}
														value={this.state.dosageUnitSelect}
                            onChange={async value => {
                                if(value.value){
                                  this.setState({prescribable: {...this.state, dosageUnit: value.value, dosageUnitState: 'has-success',  dosageUnitSelect: {value: value.value, label: value.label}}}, this.setIsPrescribableFormValid);
                                }
                              }
                            }
                            options={[
                              {
                                value: "",
                                label: "Dosage Unit",
                                isDisabled: true,
                              },
                              {
                                value: "Milligram",
                                label: 'Milligram (mg)'
                              },
                              {
                                value: 'Gram',
                                label: 'Grams (g)'
                              }
                            ]}
                          />
                        </FormGroup>
                    </Col>
                    <Col md="5">
                        <FormGroup className={`has-label`}>
                          <label>Dosage Frequency</label>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Dosage Frequency"
                            name="select"
														closeMenuOnSelect={false}
														value={this.state.dosageFrequencySelect}
                            onChange={async value => {
                                if(value.value){
                                  this.setState({prescribable: {...this.state, dosageFrequency: value.value, dosageFrequencySelect: {value: value.value, label: value.label}, dosageFrequencyState: 'has-success'}}, this.setIsPrescribableFormValid);
                                }
                              }
                            }
                            options={[
                              {
                                value: "",
                                label: "Dosage Frequency",
                                isDisabled: true,
                              },
                              {
                                value: "Daily",
                                label: 'Daily'
                              },
                              {
                                value: 'Twice Daily',
                                label: 'Twice Daily'
                              }
                            ]}
                          />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className={`has-label ${this.state.minWeightState}`}>
                          <label>Minimum Weight (lbs)</label>
                          <Input
                            name="minweight"
														type="text"
														value={this.state.minWeight}
                            onChange={e => this.change(e, "minWeight", "length", '1')}
                          />
                          {this.state.minWeightState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid minimum weight (in lbs.)
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                    <Col md="1">
                        <FormGroup className={`has-label checkbox-radio`}>
                          <label>Required Gender</label>
                          <FormGroup check>
                          <Label check>
                            <Input type="checkbox" checked={(this.state.requiredGender === 'M' || this.state.requiredGender === 'B') && this.state.requiredGender !== null} onChange={e => this.setState({requiredGenderState: 'has-success', requiredGender: this.state.requiredGender === null ? 'M' : this.state.requiredGender === 'B' ? 'F' : this.state.requiredGender ==='M' ? null : 'B',}, this.setIsPrescribableFormValid)}/>
                            <span className="form-check-sign" />
                            Male
                          </Label>
                        </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" checked={(this.state.requiredGender === 'F' || this.state.requiredGender === 'B') && this.state.requiredGender !== null} onChange={e => this.setState({requiredGenderState: 'has-success', requiredGender:  this.state.requiredGender === null ? 'F' : this.state.requiredGender === 'B' ? 'M' : this.state.requiredGender ==='F' ? null :  'B',}, this.setIsPrescribableFormValid)}/>
                              <span className="form-check-sign" />
                              Female
                            </Label>
                          </FormGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup className={`has-label ${this.state.nameState}`}>
                          <label>Name</label>
                          <Input
                            name="name"
                            type="text"
														onChange={e => this.change(e, "name", "length", '1')}
														value={this.state.name}
                          />
                          {this.state.nameState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid name
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
								<CardFooter>
										<Button className="btn-fill pull-right" color="primary" type="submit" disabled={!this.state.isPrescribableFormValid} onClick={e => this.updatePrescribable()}>
											Update Prescribable
										</Button>
								</CardFooter>
              </Card>
					</Col>
				</Row>
				</div>
			</>
		)
	}
}

export default PrescribableProfile;