import React from "react";
import { withRouter } from "react-router-dom";
import { getDrugWithFilter } from "../../services/Drug";
import NotificationAlert from "react-notification-alert";
import Select from "react-select";
import Switch from "react-bootstrap-switch";
import {updateDrug} from "../../services/Drug";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
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
        minWeight: '',
        minWeightState: null,
        requiredGender: '',
        requiredGenderState: null,
        drugId: this.props.match.params.id,
        isPrescribableFormValid: false,
      }
    };
  };

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

  async componentDidMount(){
    const drugId = this.props.match.params.id;
    try {
      const drug = await getDrugWithFilter({drugId: drugId});
      const parentDrugs = await getDrugWithFilter({nonGenericParentId: 0, active: 'Y'});
      const parentDrug = await getDrugWithFilter({drugId: drug[0].nonGenericParentId});
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

      this.setState({drug: drugProfileState});
    } catch (err) {
      this.showInternalServerErrorMessage();
    }
  }

  setIsFormValid(){
    this.setState({isDrugFormValid: this.isFormValid()});
  }

	change = (event, stateName, type, stateNameEqualTo, stateTree) => {
		switch (type) {
			case "length":
				if (this.verifyLength(event.target.value, stateNameEqualTo)) {
					this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
				} else {
					this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
				}
				break;
			default:
				break;
		}
		this.setState({ [stateTree]: {...this.state[stateTree], [stateName]: event.target.value || ''}});
	};

  isFormValid(){
    return Object.entries(this.state.drug).filter(x =>  x[0].includes('State') && x[1] !== null && x[1].includes('has-danger')).length === 0 && (!this.state.drug.isGeneric || this.state.drug.isGeneric && Number(this.state.drug.nonGenericParentId) !== 0);
  }

  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

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

  isPrescribableFormValid(){

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
                  <CardTitle tag="h4">Prescribable List</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Add Prescribable</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="3">
                        <FormGroup className={`has-label ${this.state.dosageState}`}>
                          <label>Dosage</label>
                          <Input
                            name="dosage"
                            type="text"
                            onChange={e => this.change(e, "dosage", "length", '1', 'prescribable')}
                            defaultValue={this.state.dosage}
                          />
                          {this.state.dosageState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid dosage amount
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup className={`${this.state.dosageState}`}>
                          <label>Dosage Unit</label>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Dosage Unit"
                            name="select"
                            closeMenuOnSelect={false}
                            onChange={async value => {
                                if(value.value){
                                  this.setState({prescribable: {...this.state.prescribable, dosageFrequency: value.value}}, () => {
                                    this.setState({prescribable: {...this.state.prescribable, isPrescribableFormValid: this.isPrescribableFormValid()}});
                                  });
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
                        <FormGroup className={`has-label ${this.state.dosageState}`}>
                          <label>Dosage Frequency</label>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Dosage Frequency"
                            name="select"
                            closeMenuOnSelect={false}
                            onChange={async value => {
                                if(value.value){
                                  this.setState({prescribable: {...this.state.prescribable, dosageFrequency: value.value}}, () => {
                                    this.setState({prescribable: {...this.state.prescribable, isPrescribableFormValid: this.isPrescribableFormValid()}});
                                  });
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
                  </Row>
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