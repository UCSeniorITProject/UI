import React from "react";
import { withRouter } from "react-router-dom";
import { getDrugWithFilter } from "../../services/Drug";
import NotificationAlert from "react-notification-alert";
import Select from "react-select";
import Switch from "react-bootstrap-switch";
import {updateDrug} from "../../services/Drug";
import ReactTable from "react-table";
import {createPrescribable, getPrescribableWithFilter} from "../../services/Prescribable";

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
class DrugProfile extends React.Component{ 
  constructor(props){
    super(props);
    this.state = {
      drug: {
        isDrugFormValid: true,
        name: '',
        nameState: null,
        manufacturer: '',
        manufacturerState: null,
        nonGenericParentId: null,
        federalDrugIdentifier: null,
        parentDrugs: [],
      },
      prescribable: {
        dosage: '',
        dosageState: null,
        dosageUnit: '',
        dosageUnitState: null,
        dosageFrequency: '',
        dosageFrequencyState: null,
        directions: '',
        directionsState: null,
        directionsSelect: null,
        minWeight: '',
        minWeightState: null,
        requiredGender: null,
        requiredGenderState: null,
        drugId: this.props.match.params.id,
        isPrescribableFormValid: false,
        name: '',
				nameState: null,
				drugFrequencySelect: null,
				dosageUnitSelect: null,
			},
			prescribables: [],
    };
  };
  
  isPrescribableFormValid(){
		console.log(Object.entries(this.state.prescribable).filter(x => (x[0].includes('State') && (x[1] === null || x[1] === 'has-danger'))))
    return Object.entries(this.state.prescribable).filter(x => (x[0].includes('State') && (x[1] === null || x[1] === 'has-danger'))).length === 0;
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

  async addPrescribable(){
    try {
      const prescribable = {
        name: this.state.prescribable.name,
        dosage: this.state.prescribable.dosage,
        dosageUnit: this.state.prescribable.dosageUnit,
        dosageFrequency: this.state.prescribable.dosageFrequency,
        minWeight: this.state.prescribable.minWeight,
        requiredGender: this.state.prescribable.requiredGender,
        drugId: this.state.prescribable.drugId,
        directions: this.state.prescribable.directions,
        active: 'Y',
      };

      const prescribableSaved = await createPrescribable(prescribable);
      this.setState({prescribable: {
        dosage: '',
        dosageState: null,
        dosageUnit: '',
        dosageUnitState: null,
        dosageFrequency: '',
        dosageFrequencyState: null,
        directions: '',
        directionsState: null,
        directionsSelect: null,
        minWeight: '',
        minWeightState: null,
        requiredGender: null,
        requiredGenderState: null,
        drugId: this.props.match.params.id,
        isPrescribableFormValid: false,
        name: '',
				nameState: null,
				drugFrequencySelect: null,
				dosageFrequencySelect: null,
				dosageUnitSelect: null,
      },
      prescribables: [...this.state.prescribables, {
        prescribableId: prescribableSaved.prescribableId,
        name: prescribableSaved.name,
        dosage: prescribableSaved.dosage,
        dosageFrequency: prescribableSaved.dosageFrequency,
        actions: (
          <div className="actions-right">
            <Button
              color="primary"
              size="md"
              className="btn-fill"
              onClick={e => this.props.history.push(`/admin/prescribable/profile/${prescribableSaved.prescribableId}/`)}
            >
              EDIT
            </Button>
          </div>
        )
      }],
    }, () => {console.log(this.state)});

      var options = {};
      options = {
        place: 'tr',
        message: (
          <div>
            <div>
              Succesfully created the prescribable!
            </div>
          </div>
        ),
        type: 'success',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
      };
      this.refs.notificationAlert.notificationAlert(options);

    } catch (err) {
      this.showInternalServerErrorMessage();
    }
  }

  async componentDidMount(){
    const drugId = this.props.match.params.id;
    try {
      const drug = await getDrugWithFilter({drugId: drugId});
      const [parentDrugs, parentDrug, prescribables] = await Promise.all([getDrugWithFilter({nonGenericParentId: 0, active: 'Y'}), getDrugWithFilter({drugId: drug[0].nonGenericParentId}), getPrescribableWithFilter({active: 'Y', drugId})]);

      let drugProfileState = {
        name: drug[0].name,
        manufacturer: drug[0].manufacturer,
        federalDrugIdentifier:  drug[0].federalDrugIdentifier,
        nonGenericParentId: drug[0].nonGenericParentId,
        parentDrugs: parentDrugs.map(x => {return {value: x.drugId, label: x.name}}),
        isGeneric: drug[0].nonGenericParentId !== '0',
        isDrugFormValid: true,
      }

      if(drugProfileState.isGeneric){
        drugProfileState.parentDrugSelected = {
          value: drug[0].nonGenericParentId,
          label: parentDrug[0].name,
        }
			}
			
      this.setState({drug: drugProfileState, prescribables: prescribables.map(x => {
				return {
					prescribableId: x.prescribableId,
					name: x.name,
					dosage: x.dosage,
					dosageFrequency: x.dosageFrequency,
					actions: (
						<div className="actions-right">
							<Button
								color="primary"
								size="md"
								className="btn-fill"
								value={x.userId}
								onClick={e => this.props.history.push(`/admin/prescribable/profile/${x.prescribableId}/`)}
							>
								EDIT
							</Button>
        		</div>
					)
				};
			})});
    } catch (err) {
      this.showInternalServerErrorMessage();
    }
  }

  setIsFormValid(){
    this.setState({drug: {isDrugFormValid: this.isFormValid()}});
  }

	change = (event, stateName, type, stateNameEqualTo, stateTree) => {
		switch (type) {
			case "length":
				if (this.verifyLength(event.target.value, stateNameEqualTo)) {
					this.setState({[stateTree] : { ...this.state[stateTree], [stateName + "State"]: "has-success", [stateName]: event.target.value || '' }}, stateTree === 'prescribable' ? this.setIsPrescribableFormValid : this.setIsFormValid.bind(this));
				} else {
					this.setState({[stateTree] : { ...this.state[stateTree], [stateName + "State"]: "has-danger", [stateName]: event.target.value || '' }}, stateTree === 'prescribable' ? this.setIsPrescribableFormValid : this.setIsFormValid.bind(this));
				}
        break;
      case "num":
				if (!isNaN(event.target.value) && event.target.value.length !== 0) {
					this.setState({[stateTree] : { ...this.state[stateTree], [stateName + "State"]: "has-success", [stateName]: event.target.value || '' }}, stateTree === 'prescribable' ? this.setIsPrescribableFormValid : this.setIsFormValid.bind(this));
				} else {
					this.setState({[stateTree] : { ...this.state[stateTree], [stateName + "State"]: "has-danger", [stateName]: event.target.value || '' }}, stateTree === 'prescribable' ? this.setIsPrescribableFormValid : this.setIsFormValid.bind(this));
				}
				break;
			default:
        break;
		}
  };
  
  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  isFormValid(){
    return Object.entries(this.state.drug).filter(x =>  x[0].includes('State') && x[1] !== null && x[1].includes('has-danger')).length === 0 && ((!this.state.drug.isGeneric || this.state.drug.isGeneric) && Number(this.state.drug.nonGenericParentId) !== 0);
  }

  setIsPrescribableFormValid(){
    this.setState({prescribable: {...this.state.prescribable, isPrescribableFormValid: this.isPrescribableFormValid()}})
  }

  async updateDrug(){
    const drugId = this.props.match.params.id;
    let drugFieldsToUpdate = {
      name: this.state.drug.name,
      manufacturer: this.state.drug.manufacturer,
      federalDrugIdentifier: this.state.drug.federalDrugIdentifier,
    };
    if(this.state.drug.isGeneric){
      drugFieldsToUpdate.nonGenericParentId = this.state.drug.nonGenericParentId;
    } else {
      drugFieldsToUpdate.nonGenericParentId = 0;
    }

    try {
      await updateDrug(drugId, drugFieldsToUpdate);
      var options = {};
      options = {
        place: 'tr',
        message: (
          <div>
            <div>
              Succesfully updated the drug!
            </div>
          </div>
        ),
        type: 'success',
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
      };
      this.refs.notificationAlert.notificationAlert(options);
    } catch (err) {
      this.showInternalServerErrorMessage();
    }
  }

  render(){
    let parentDrugSelect;
		if(this.state.drug.isGeneric){
			parentDrugSelect = (
			<Col className="pr-md-1" md="6">
				<p className="category">Generic Drug</p>
				<Switch
					onChange={async e => this.setState({drug: {...this.state.drug, isGeneric: false, nonGenericParentId: 0}})}
					value={this.state.drug.isGeneric}
					offColor=""
					offText=""
					onColor=""
					onText=""
				/>{" "}
				<Select
						className="react-select info"
						classNamePrefix="react-select"
						placeholder="Non-Generic Version"
						name="select"
						closeMenuOnSelect={false}
						value={this.state.drug.parentDrugSelected}
						onChange={async value => {
								if(value.value){
                  this.setState({drug: {...this.state.drug, nonGenericParentId: value.value}}, () => {
                    this.setState({drug: {...this.state.drug, isDrugFormValid: this.isFormValid()}});
                  });
								}
							}
						}
						options={[
							{
								value: "",
								label: "Non-Generic Drugs",
								isDisabled: true,
							},
              ...this.state.drug.parentDrugs,
						]}
					/>
				</Col>);
		} else {
			parentDrugSelect = (
			<Col className="pr-md-1" md="6">
				<p className="category">Generic Drug</p>
				<Switch
					onChange={async e => {this.setState({drug: {...this.state.drug, isGeneric: true}}, () => {
            this.setState({drug: {...this.state.drug, isDrugFormValid: this.isFormValid()}});
          })}}
					value={false}
					offColor=""
					offText=""
					onColor=""
					onText=""
				/>{" "}
			</Col>);
		}
    return (
      <>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">
          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Drug Info</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <FormGroup className={`has-label ${this.state.drug.nameState}`}>
                          <label>Drug Name</label>
                          <Input
                            name="name"
                            type="text"
                            onChange={e => this.change(e, "name", "length", '1', 'drug')}
                            defaultValue={this.state.drug.name}
                          />
                          {this.state.drug.nameState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid name
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className={`has-label ${this.state.drug.manufacturerState}`}>
                          <label>Manufacturer</label>
                          <Input
                            name="manufacturer"
                            type="text"
                            onChange={e => this.change(e, "manufacturer", "length", '1', 'drug')}
                            defaultValue={this.state.drug.manufacturer}
                          />
                          {this.state.drug.manufacturerState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid manufacturer name
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className={`has-label ${this.state.drug.federalDrugIdentifierState}`}>
                          <label>Federal Drug Identifier</label>
                          <Input
                            name="federaldrugidentifier"
                            type="text"
                            onChange={e => this.change(e, "federalDrugIdentifier", "length", '1', 'drug')}
                            defaultValue={this.state.drug.federalDrugIdentifier}
                          />
                          {this.state.drug.federalDrugIdentifierState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid ID
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                    {parentDrugSelect}
                  </Row>
                </CardBody>
                <CardFooter>
                <Button className="btn-fill pull-right" color="primary" type="submit" disabled={!this.state.drug.isDrugFormValid} onClick={e => this.updateDrug()}>
                  Update Drug
                </Button>
              </CardFooter>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Add Prescribable</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="3">
                        <FormGroup className={`has-label ${this.state.prescribable.dosageState}`}>
                          <label>Dosage</label>
                          <Input
                            name="dosage"
														type="text"
														value={this.state.prescribable.dosage}
                            onChange={e => this.change(e, "dosage", "length", '1', 'prescribable')}
                          />
                          {this.state.prescribable.dosageState === "has-danger" ? (
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
														value={this.state.prescribable.dosageUnitSelect}
                            onChange={async value => {
                                if(value.value){
                                  this.setState({prescribable: {...this.state.prescribable, dosageUnit: value.value, dosageUnitState: 'has-success',  dosageUnitSelect: {value: value.value, label: value.label}}}, this.setIsPrescribableFormValid);
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
														value={this.state.prescribable.dosageFrequencySelect}
                            onChange={async value => {
															console.log(value)
                                if(value.value){
                                  this.setState({prescribable: {...this.state.prescribable, dosageFrequency: value.value, dosageFrequencySelect: {value: value.value, label: value.label}, dosageFrequencyState: 'has-success'}}, this.setIsPrescribableFormValid);
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
                        <FormGroup className={`has-label ${this.state.prescribable.minWeightState}`}>
                          <label>Minimum Weight (lbs)</label>
                          <Input
                            name="minweight"
														type="text"
														value={this.state.prescribable.minWeight}
                            onChange={e => this.change(e, "minWeight", "num", '1', 'prescribable')}
                          />
                          {this.state.prescribable.minWeightState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid minimum weight as a number (in lbs.)
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                    <Col md="2">
                        <FormGroup className={`has-label checkbox-radio`}>
                          <label>Required Gender</label>
                          <FormGroup check>
                          <Label check>
                            <Input type="checkbox" checked={(this.state.prescribable.requiredGender === 'M' || this.state.prescribable.requiredGender === 'B') && this.state.prescribable.requiredGender !== null} onChange={e => this.setState({prescribable: {...this.state.prescribable, requiredGenderState: 'has-success', requiredGender: this.state.prescribable.requiredGender === null ? 'M' : this.state.prescribable.requiredGender === 'B' ? 'F' : this.state.prescribable.requiredGender ==='M' ? null : 'B',}}, this.setIsPrescribableFormValid)}/>
                            <span className="form-check-sign" />
                            Male
                          </Label>
                        </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" checked={(this.state.prescribable.requiredGender === 'F' || this.state.prescribable.requiredGender === 'B') && this.state.prescribable.requiredGender !== null} onChange={e => this.setState({prescribable: {...this.state.prescribable, requiredGenderState: 'has-success', requiredGender:  this.state.prescribable.requiredGender === null ? 'F' : this.state.prescribable.requiredGender === 'B' ? 'M' : this.state.prescribable.requiredGender ==='F' ? null :  'B',}}, this.setIsPrescribableFormValid)}/>
                              <span className="form-check-sign" />
                              Female
                            </Label>
                          </FormGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup className={`has-label ${this.state.prescribable.nameState}`}>
                          <label>Name</label>
                          <Input
                            name="name"
                            type="text"
														onChange={e => this.change(e, "name", "length", '1', 'prescribable')}
														value={this.state.prescribable.name}
                          />
                          {this.state.prescribable.nameState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid name
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup className={`has-label`}>
                          <label>Directions</label>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Directions"
                            name="select"
														closeMenuOnSelect={false}
														value={this.state.prescribable.directionsSelect}
                            onChange={async value => {
                                if(value.value){
                                  this.setState({prescribable: {...this.state.prescribable, directions: value.value, directionsSelect: {value: value.value, label: value.label}, directionsState: 'has-success'}}, this.setIsPrescribableFormValid);
                                }
                              }
                            }
                            options={[
                              {
                                value: "",
                                label: "Directions",
                                isDisabled: true,
                              },
                              {
                                value: "By Mouth",
                                label: 'By Mouth'
                              },
                              {
                                value: 'Subcutaneously',
                                label: 'Subcutaneously'
                              }
                            ]}
                          />
                        </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
								<CardFooter>
										<Button className="btn-fill pull-right" color="primary" type="submit" disabled={!this.state.prescribable.isPrescribableFormValid} onClick={e => this.addPrescribable()}>
											Add Prescribable
										</Button>
								</CardFooter>
              </Card>
            </Col>
						<Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Prescribable List</CardTitle>
                </CardHeader>
                <CardBody>
									<ReactTable
                          data={this.state.prescribables}
                          filterable
                          resizable={false}
                          columns={[
                            {
                              Header: "Prescribable ID",
                              accessor: "prescribableId",
                            },
                            {
                              Header: "Name",
                              accessor: "name"
                            },
                            {
                              Header: "Dosage",
                              accessor: "dosage"
                            },
                            {
                              Header: "Dosage Frequency",
                              accessor: "dosageFrequency"
                            },
                            {
                              Header: "Actions",
                              accessor: "actions",
                              sortable: false,
                              filterable: false
                            }
                          ]}
                          defaultPageSize={10}
                          showPaginationTop
                          showPaginationBottom={false}
                          className="-striped -highlight"
                        />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default withRouter(DrugProfile);