import React from "react";
import { withRouter } from "react-router-dom";
import {getDrugWithFilter, createDrug} from "../../services/Drug";
import {
  Row,
	Col,
	CardHeader,
	CardBody,
	CardTitle,
	Card,
	InputGroup,
	Input,
	InputGroupAddon,
	InputGroupText,
	CardFooter,
	Button,
} from "reactstrap";
import classnames from "classnames";
import Select from "react-select";
import Switch from "react-bootstrap-switch";
import NotificationAlert from "react-notification-alert";
class AddDrug extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			nameState: null,
			manufacturer: '',
			manufacturerState: null,
			nonGenericParentId: null,
			nonGenericParentIdState: 'has-success',
			federalDrugIdentifier: '',
			federalDrugIdentifierState: null,
			isGeneric: false,
			parentDrugs: [],
		};
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
		console.log(this.state)
		this.setState({ [stateName]: event.target.value || ''});
	};

  isFormValid(){
    return Object.entries(this.state).filter(x => x[0].includes('State') && x[1] ===null || x[0].includes('State') && x[1].includes('has-danger')).length === 0;
  }

  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  handleChange(event, stateName, type, stateNameEqualTo, maxValue){
		console.log(this.state)
    this.setState({ [event.target.name]: event.target.value});
    switch (type) {
      case "length": 
        if(this.verifyLength(event.target.value, 1)){
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 6)
          && event.target.value.toLowerCase() !== event.target.value) {
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      case "tel":
        if(this.verifyPhone(event.target.value)){
          this.setState({ [stateName + "State"]: "has-success" }, this.setIsFormValid.bind(this));
        } else {
          this.setState({ [stateName + "State"]: "has-danger" }, this.setIsFormValid.bind(this));
        }
        break;
      default:
        break;
    }
  }

	async componentDidMount(){
		try{
			const drugs = await getDrugWithFilter({nonGenericParentId: 0, active: 'Y'});
			this.setState({parentDrugs: drugs.map(x => {return {id: x.drugId, label: x.name}})});
		} catch (err) {
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
	}

	async createDrug(){
		try {
			const drug = await createDrug({
				name: this.state.name,
				manufacturer: this.state.manufacturer,
				federalDrugIdentifier: this.state.federalDrugIdentifier,
				nonGenericParentId: this.state.nonGenericParentId,
				active: 'Y',
			});
		} catch (err) {
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
	}

	render(){

		let parentDrugSelect;
		if(this.state.isGeneric){
			parentDrugSelect = (
			<Col className="pr-md-1" md="6">
				<p className="category">Generic Drug</p>
				<Switch
					onChange={async e => this.setState({isGeneric: false})}
					defaultValue={false}
					offColor=""
					offText=""
					onColor=""
					onText=""
				/>{" "}
				<Select
						className="react-select info"
						classNamePrefix="react-select"
						placeholder="Non-Generic Version"
						name="multipleSelect"
						closeMenuOnSelect={false}
						isMulti
						value={this.state.multipleSelect}
						onChange={value => {
								if(value.length > 0){
									this.setState({ nonGenericParentId: value[0].id })
								}
							}
						}
						options={[
							{
								value: "",
								label: "Non-Generic Drugs",
								isDisabled: true
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
					onChange={async e => this.setState({isGeneric: true})}
					defaultValue={false}
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
						<Col md="12">
							<Card>
								<CardHeader>
									<CardTitle tag="h4">Add Drug</CardTitle>
								</CardHeader>
								<CardBody>
									<Row>
											<Col className="pr-md-1" md="6">
                        <InputGroup
                          className={classnames(this.state.nameState, {
                            "input-group-focus": this.state.nameFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-tag" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="name"
                            placeholder="Drug Name"
                            type="text"
                            onChange={e => this.change(e, "name", "length", 1)}
                            onFocus={e => this.setState({ nameFocus: true })}
                            onBlur={e => {this.setState({ nameFocus: false }); this.change(e, 'name', 'length', 1)}}
                          />
                        </InputGroup>
                    </Col>
										<Col className="pr-md-1" md="6">
                        <InputGroup
                          className={classnames(this.state.manufacturerState, {
                            "input-group-focus": this.state.manufacturerFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-bus-front-12" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="drugManufacturer"
                            placeholder="Manufacturer"
                            type="text"
                            onChange={e => this.change(e, "manufacturer", "length", 1)}
                            onFocus={e => this.setState({ manufacturerFocus: true })}
                            onBlur={e => {this.setState({ manufacturerFocus: false }); this.change(e, 'manufacturer', 'length', 1)}}
                          />
                        </InputGroup>
                    </Col>
										<Col className="pr-md-1" md="6">
                        <InputGroup
                          className={classnames(this.state.federalDrugIdentifierState, {
                            "input-group-focus": this.state.federalDrugIdentifierFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-badge" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="federalDrugIdentifier"
                            placeholder="Federal Drug Identifier"
                            type="text"
                            onChange={e => this.change(e, "federalDrugIdentifier", "length", 1)}
                            onFocus={e => this.setState({ federalDrugIdentifierFocus: true })}
                            onBlur={e => {this.setState({ federalDrugIdentifierFocus: false }); this.change(e, 'federalDrugIdentifier', 'length', 1)}}
                          />
                        </InputGroup>
                    </Col>
										{parentDrugSelect}
									</Row>
								</CardBody>
								<CardFooter>
									<Button className="btn-fill pull-right" color="primary" type="submit" disabled={!this.state.isFormValid} onClick={e => this.createDrug()}>
                    Create Drug
                  </Button>
								</CardFooter>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		)
	};
};

export default withRouter(AddDrug);