import React from "react";
import { withRouter } from "react-router-dom";
import { getDrugWithFilter } from "../../services/Drug";
import NotificationAlert from "react-notification-alert";

class DrugProfile extends React.Component{ 
  constructor(props){
    super(props);
    this.state = {
      name: '',
      nameState: null,
      manufacturer: '',
      manufacturerState: null,
      federalDrugIdentifier: null,
      federalDrugIdentifierState: '',
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
      this.setState({
        name: drug[0].name,
        manufacturer: drug[0].manufacturer,
        federalDrugIdentifier:  drug[0].federalDrugIdentifier,
        nonGenericParentId: drug[0].nonGenericParentId,
      });
    } catch (err) {
      this.showInternalServerErrorMessage();
    }
  }

  render(){
    return (
      <>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
      </>
    )
  }
}

export default withRouter(DrugProfile);