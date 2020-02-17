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
      isFormValid: true,
      name: '',
      nameState: null,
      manufacturer: '',
      manufacturerState: null,
      nonGenericParentId: null,
      federalDrugIdentifier: null,
      parentDrugs: [],
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
      }

      if(drugProfileState.isGeneric){
        drugProfileState.parentDrugSelected = {
          value: drug[0].nonGenericParentId,
          label: parentDrug[0].name,
        }
      }

      this.setState(drugProfileState);
    } catch (err) {
      this.showInternalServerErrorMessage();
    }
  }

  setIsFormValid(){
    this.setState({isFormValid: this.isFormValid()});
  }

	change = (event, stateName, type, stateNameEqualTo, maxValue) => {
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
		this.setState({ [stateName]: event.target.value || ''});
	};

  isFormValid(){
    return Object.entries(this.state).filter(x =>  x[0].includes('State') && x[1] !== null && x[1].includes('has-danger')).length === 0 && (!this.state.isGeneric || this.state.isGeneric && Number(this.state.nonGenericParentId) !== 0);
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
      name: this.state.name,
      manufacturer: this.state.manufacturer,
      federalDrugIdentifier: this.state.federalDrugIdentifier,
    };
    if(this.state.isGeneric){
      drugFieldsToUpdate.nonGenericParentId = this.state.nonGenericParentId;
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
		if(this.state.isGeneric){
			parentDrugSelect = (
			<Col className="pr-md-1" md="6">
				<p className="category">Generic Drug</p>
				<Switch
					onChange={async e => this.setState({isGeneric: false, nonGenericParentId: 0})}
					value={this.state.isGeneric}
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
						value={this.state.parentDrugSelected}
						onChange={async value => {
								if(value.value){
                  this.setState({ nonGenericParentId: value.value}, () => {
                    this.setState({isFormValid: this.isFormValid()});
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
              ...this.state.parentDrugs,
						]}
					/>
				</Col>);
		} else {
			parentDrugSelect = (
			<Col className="pr-md-1" md="6">
				<p className="category">Generic Drug</p>
				<Switch
					onChange={async e => this.setState({isGeneric: true}, () => {
            this.setState({isFormValid: this.isFormValid()});
          })}
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
                      <FormGroup className={`has-label ${this.state.nameState}`}>
                          <label>Drug Name</label>
                          <Input
                            name="name"
                            type="text"
                            onChange={e => this.change(e, "name", "length", '1')}
                            defaultValue={this.state.name}
                          />
                          {this.state.nameState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid name
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className={`has-label ${this.state.manufacturerState}`}>
                          <label>Manufacturer</label>
                          <Input
                            name="manufacturer"
                            type="text"
                            onChange={e => this.change(e, "manufacturer", "length", '1')}
                            defaultValue={this.state.manufacturer}
                          />
                          {this.state.manufacturerState === "has-danger" ? (
                            <label className="error">
                              Please enter a valid manufacturer name
                            </label>
                          ) : null}
                        </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className={`has-label ${this.state.federalDrugIdentifierState}`}>
                          <label>Federal Drug Identifier</label>
                          <Input
                            name="federaldrugidentifier"
                            type="text"
                            onChange={e => this.change(e, "federalDrugIdentifier", "length", '1')}
                            defaultValue={this.state.federalDrugIdentifier}
                          />
                          {this.state.federalDrugIdentifierState === "has-danger" ? (
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
                <Button className="btn-fill pull-right" color="primary" type="submit" disabled={!this.state.isFormValid} onClick={e => this.updateDrug()}>
                  Update Drug
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

export default withRouter(DrugProfile);