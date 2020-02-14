import React from "react";
import { withRouter } from "react-router-dom";
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
} from "reactstrap";
import classnames from "classnames";
import Select from "react-select";
import Switch from "react-bootstrap-switch";
class AddDrug extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			nameState: null,
			manufacturer: '',
			manufacturerState: null,
			nonGenericParentId: '',
			nonGenericParentIdState: null,
			federalDrugIdentifier: '',
			federalDrugIdentifierState: null,
			isGeneric: false,
		};
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
						onChange={value =>
							this.setState({ multipleSelect: value })
						}
						options={[
							{
								value: "",
								label: "Non-Generic Drugs",
								isDisabled: true
							},
							{ value: "2", label: "Paris " },
							{ value: "3", label: "Bucharest" },
							{ value: "4", label: "Rome" },
							{ value: "5", label: "New York" },
							{ value: "6", label: "Miami " },
							{ value: "7", label: "Piatra Neamt" },
							{ value: "8", label: "Paris " },
							{ value: "9", label: "Bucharest" },
							{ value: "10", label: "Rome" },
							{ value: "11", label: "New York" },
							{ value: "12", label: "Miami " },
							{ value: "13", label: "Piatra Neamt" },
							{ value: "14", label: "Paris " },
							{ value: "15", label: "Bucharest" },
							{ value: "16", label: "Rome" },
							{ value: "17", label: "New York" },
							{ value: "18", label: "Miami " },
							{ value: "19", label: "Piatra Neamt" }
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
                          className={classnames(this.state.drugNameState, {
                            "input-group-focus": this.state.drugNameFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-tag" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            name="drugName"
                            placeholder="Drug Name"
                            type="text"
                            onChange={e => this.change(e, "drugName", "length", 1)}
                            onFocus={e => this.setState({ drugNameFocus: true })}
                            onBlur={e => {this.setState({ drugNameFocus: false }); this.change(e, 'drugName', 'length', 1)}}
                          />
                        </InputGroup>
                    </Col>
										<Col className="pr-md-1" md="6">
                        <InputGroup
                          className={classnames(this.state.drugManufacturerState, {
                            "input-group-focus": this.state.drugManufacturerFocus
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
                            onChange={e => this.change(e, "drugManufacturer", "length", 1)}
                            onFocus={e => this.setState({ drugManufacturerFocus: true })}
                            onBlur={e => {this.setState({ drugManufacturerFocus: false }); this.change(e, 'drugManufacturer', 'length', 1)}}
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
							</Card>
						</Col>
					</Row>
				</div>
			</>
		)
	};
};

export default withRouter(AddDrug);