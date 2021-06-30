import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import {
  Alert,
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Progress,
  CustomInput,
} from "reactstrap";

// Actions
import { uploadCSV, apiError, uploadCSVFailed } from "../../store/actions";

import Breadcrumbs from "../../components/Common/Breadcrumb";

function CSVLoader(props) {
  const [uploading, setUploading] = useState(0);
  // const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const { error, loading, csv } = props;

  const uploadCSVChange = event => {
    event.stopPropagation();
    event.preventDefault();
    // setError(null);

    const file = event.target.files[0];

    if (!file) return;

    const ext = file?.name.split(".").pop();

    if (ext !== "csv" && ext !== "xls" && ext !== "xlsx") {
      // setError(true);
      uploadCSVFailed("Only CSV files are allowed");
    }

    const data = new FormData();
    data.append("csv", file);

    console.log("dataData", { ...data });

    uploadCSV(data);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>CSV Loader | Petromin Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Petromin" breadcrumbItem="CSV Loader" noSetting />

          {/* CSV Upload */}
          <Card>
            <CardBody>
              <Row className="align-items-center justify-content-center">
                <Col xs="8" sm="10" lg="10">
                  <Progress animated color="primary" value={uploading} />
                </Col>
                <Col xs="4" sm="2" lg="2" className="text-end">
                  <Button
                    color="primary"
                    onClick={() => inputRef.current.click()}
                  >
                    <input
                      type="file"
                      id="csv"
                      name="csv"
                      className="hidden"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      ref={inputRef}
                      onChange={event => uploadCSVChange(event)}
                    />
                    Upload a CSV
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>

          {/* CSV Upload Error */}
          {error && (
            <Alert color="danger" className="mb-0">
              <strong>Oh snap!</strong> {error}.
            </Alert>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
}

const mapStatetoProps = state => {
  const { csv, error, loading } = state.currentCSV;
  return { csv, error, loading };
};

export default connect(mapStatetoProps, {
  uploadCSV,
  apiError,
  uploadCSVFailed,
})(CSVLoader);
