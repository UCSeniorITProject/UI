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
import {getDrugTypesWithFilter} from "../../services/DrugType";
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
			drugType: null,
			drugTypeSelect: null,
			drugTypes: [],
			drugTypeState: null,
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
    return Object.entries(this.state).filter(x=> x[0].includes('State') && (x[1] === null || x[1] === 'has-danger')).length === 0;
  }

  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

	async componentDidMount(){
		try{
			const [drugTypes, drugs] = await Promise.all([getDrugTypesWithFilter({}), getDrugWithFilter({nonGenericParentId: 0, active: 'Y'})]);
			this.setState({drugTypes: drugTypes.map(x => {
				return {
					label: x.drugTypeName,
					id: x.drugTypeId,
					value: x.drugTypeId,
				}
			}),
			parentDrugs: drugs.map(x => {return {id: x.drugId, label: x.name}})
		})
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
				federalDrugIdentifier: Number.parseInt(this.state.federalDrugIdentifier),
				nonGenericParentId: this.state.nonGenericParentId === null ? null : this.state.nonGenericParentId,
				drugType: this.state.drugType,
				active: 'Y',
			});
			this.props.history.push(`/admin/drug/profile/${drug.drugId}`)
		} catch (err) {
			console.log(err)
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

	showPickDrugTypeMessage(){
		var options = {};
		options = {
			place: 'tr',
			message: (
				<div>
					<div>
						You must select a drug type to continue!
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
										<Col className="pr-md-1" md="3">
											<Select
												className="react-select info"
												classNamePrefix="react-select"
												placeholder="Drug Types"
												name="drugSelect"
												closeMenuOnSelect={false}
												value={this.state.drugTypeSelect}
												onChange={value => {
														if(value){
															this.setState({ drugType: value.id, drugTypeSelect: value, drugTypeState: 'has-success' }, this.setIsFormValid())
														}
													}
												}
												options={[
													{
														value: "",
														label: "Drug Types",
														isDisabled: true
													},
													...this.state.drugTypes,
												]}
											/>
										</Col>
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