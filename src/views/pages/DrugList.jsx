import React from "react";
import { Card, CardHeader, CardBody, Button, Row, Col } from "reactstrap";
import { getDrugWithFilter } from "../../services/Drug";
import ReactTable from "react-table";
import { withRouter } from "react-router";

class DrugList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drugs: [],
    };
  }

  async componentDidMount() {
    const drugs = await getDrugWithFilter({ active: "Y" });
    const parentDrugs = await getDrugWithFilter({
      ids: drugs
        .filter((x) => x.nonGenericParentId !== null)
        .map((x) => x.nonGenericParentId),
    });
    const drugList = drugs.map((x) => {
      let nonGenericParentName = "";
      if (x.nonGenericParentId !== null) {
        const nonGenericParentDrug = parentDrugs.filter(
          (y) => Number(x.nonGenericParentId) === y.drugId
        );
        if (nonGenericParentDrug.length > 0) {
          nonGenericParentName = nonGenericParentDrug[0].name;
        }
      }
      return {
        name: x.name,
        drugId: x.drugId,
        manufacturer: x.manufacturer,
        genericParentName: nonGenericParentName,
        actions: (
          <div className="actions-right">
            <Button
              color="primary"
              size="md"
              className="btn-fill"
              value={x.userId}
              onClick={(e) =>
                this.props.history.push(`/admin/drug/profile/${x.drugId}/`)
              }
            >
              EDIT
            </Button>
          </div>
        ),
      };
    });
    this.setState({ drugs: drugList });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Drug List</h5>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.drugs}
                    filterable
                    resizable={false}
                    columns={[
                      {
                        Header: "Drug ID",
                        accessor: "drugId",
                      },
                      {
                        Header: "Name",
                        accessor: "name",
                      },
                      {
                        Header: "Manufacturer",
                        accessor: "manufacturer",
                      },
                      {
                        Header: "Generic Of",
                        accessor: "genericParentName",
                      },
                      {
                        Header: "Actions",
                        accessor: "actions",
                        sortable: false,
                        filterable: false,
                      },
                    ]}
                    defaultPageSize={6}
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
    );
  }
}

export default withRouter(DrugList);
