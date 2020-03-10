import React from "react";
import { getPharmacyWithFilter } from "../../../services/Pharmacy";
import ReactTable from "react-table";

class ChoosePharmacy extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pharmacies: [],
      selectedPharmacy: null,
    }
  }

  isValidated(){
    return selectedPharmacy !== null;
  }
  
  componentDidMount(){
    const pharmacies = await getPharmacyWithFilter({active: 'Y'});
    this.setState({pharmacies});
  }

  render(){
    return (
      <>
      </>
    )
  }
}

export default ChoosePharmacy;