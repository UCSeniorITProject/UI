import React from "react";
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Button,
  Row,
  Col
} from "reactstrap";
import Select from "react-select";
import { getPrescribableWithFilter } from "../../../services/Prescribable";

class ChoosePrescribable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      prescribables: [],
      selectedPrescribables: [],
    }
  }

  async componentDidMount(){
    const prescribables = await getPrescribableWithFilter({active: 'Y'});
    this.setState({prescribables: prescribables.map(x => {
      return {
        label: x.name,
        value: x.prescribableId,
      }
    })})
	}
	
	showPickPrescribableMessage(){
		var options = {};
		options = {
			place: 'tr',
			message: (
				<div>
					<div>
						You must select a prescribable to continue!
					</div>
				</div>
			),
			type: 'warning',
			icon: "tim-icons icon-bell-55",
			autoDismiss: 7,
		};
		this.refs.notificationAlert.notificationAlert(options);
	}

  isValidated = () => {
		const isValid = this.state.prescribables.length !== 0;
		if(!isValid){
			this.showPickPrescribableMessage();
		}
		this.props.onChildStateChange('isChoosePrescribablePageDone', true);
    return isValid;
  }

  render(){
    return (
      <>
				<div className="rna-container">
					<NotificationAlert ref="notificationAlert" />
				</div>
        <Row>
          <Col md="9">
            <h5 className="info-text float-left">
              <b>Pick Prescribable(s)</b>
            </h5>
          </Col>
          <Col md="3">
            <Button
                className="animation-on-hover float-right"
                color="success"
                id="addPrescribable"
                type="button"
                onClick={e => this.props.history.push('/admin/drug/list')}
              >
                Add Drug/Prescribable
              </Button>
          </Col>
          
          <Col md="3"></Col>

          <Col md="6">
                        <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Choose Prescribable(s)"
                            name="select"
                            closeMenuOnSelect={false}
                            isMulti
                            value={this.state.multipleSelect}
                            onChange={value => {
																if(value.length === 0){
																	this.showPickPrescribableMessage();
																}
																this.setState({multipleSelect: value, selectedPrescribables: value.map(x=>x.value)});
																this.props.onChildStateChange('prescribables', value);
                              }   
                            }
                            options={this.state.prescribables}
                          />
          </Col>
        </Row>
      </>
    )
  }

}

export default ChoosePrescribable;