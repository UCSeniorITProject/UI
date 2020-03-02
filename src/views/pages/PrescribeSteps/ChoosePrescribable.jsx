import React from "react";
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

  isValidated = () => {
    return this.state.currentlySelectedPatientName.length !== 0;
  }

  render(){
    return (
      <>
        <Row>
          <Col md="9">
            <h5 className="info-text float-left">
              <b>Pick Prescribable</b>
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
                            placeholder="Choose City"
                            name="multipleSelect"
                            closeMenuOnSelect={false}
                            isMulti
                            value={this.state.multipleSelect}
                            onChange={value => {
                                this.setState({multipleSelect: value, selectedPrescribables: value.map(x=>x.value)});
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