import React from "react";
import { MDBDataTable } from "mdbreact";
import moment from "moment";

import { Row, Col, Card, CardTitle, CardBody } from "reactstrap";

function CSVTable({ data }) {
  const tableData = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 50,
      },
      {
        label: "Date",
        field: "Date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Attendent Name",
        field: "AttendentName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Customer Name",
        field: "CustomerName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Product",
        field: "Name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Product Type",
        field: "ProductType",
        sort: "asc",
        width: 150,
      },
      {
        label: "Unit Price",
        field: "ProductUnitPrice",
        sort: "asc",
        width: 80,
      },
      {
        label: "Quantity",
        field: "ProductQuantityTotal",
        sort: "asc",
        width: 80,
      },
      {
        label: "Amount",
        field: "Amount",
        sort: "asc",
        width: 80,
      },
    ],
    rows: (data || []).map((csv, index) => ({
      id: index + 1,
      Date: moment(csv.Date).format("DD/MM/YYYY"),
      AttendentName: csv.AttendentName,
      CustomerName: csv.CustomerName,
      Name: csv.Name,
      ProductType: csv.ProductType,
      ProductUnitPrice: csv.ProductUnitPrice,
      ProductQuantityTotal: csv.ProductQuantityTotal,
      Amount: csv.Amount,
    })),
  };

  return (
    <Row>
      <Col className="col-12">
        <Card>
          <CardBody>
            <CardTitle className="h4">Summary of Uploaded CSV</CardTitle>
            <p className="card-title-desc">
              Sort, search, filer, and enjoy with the summary view of your
              uploaded csv.
            </p>

            <MDBDataTable
              responsive
              striped
              bordered
              hover
              data={tableData || []}
              className="mdTable-footer-hide"
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default React.memo(CSVTable);
