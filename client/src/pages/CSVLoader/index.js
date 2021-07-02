import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "reactstrap";

// Actions
import { uploadCSV, uploadCSVFailed, clearAll } from "../../store/actions";

import Breadcrumbs from "../../components/Common/Breadcrumb";

// CSV Components
import StatsCards from "./StatsCards";
import StatsCharts from "./StatsCharts";
import CSVTable from "./CSVTable";

function CSVLoader(props) {
  const inputRef = useRef(null);

  const { error, loading, uploading, csv } = useSelector(
    ({ currentCSV }) => currentCSV
  );
  const dispatch = useDispatch();

  const uploadCSVChange = async event => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(clearAll());

    const file = event.target.files[0];

    if (!file) return;

    const ext = file?.name.split(".").pop();

    if (ext !== "csv" && ext !== "xls" && ext !== "xlsx") {
      dispatch(uploadCSVFailed("Only CSV files are allowed"));
      return;
    }

    dispatch(uploadCSV(file));
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
            <Alert color="danger" className="mb-4">
              <strong>Oh snap!</strong> {error}.
            </Alert>
          )}

          {/* Stats number */}
          <StatsCards
            sales={csv?.salesData?.length}
            services={csv?.servicesData?.length}
            totalAmount={csv?.totalAmount}
          />

          {/* Stats Charts */}
          <StatsCharts
            salesLabel={csv?.salesItems}
            salesData={csv?.salesChartData}
            servicesLabels={csv?.servicesItems}
            servicesData={csv?.servicesChartData}
          />

          {/* Table */}
          <CSVTable data={csv?.csvData || []} />
        </Container>
      </div>
    </React.Fragment>
  );
}

export default CSVLoader;
