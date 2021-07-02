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
    clearCSV();

    const file = event.target.files[0];

    if (!file) return;

    const ext = file?.name.split(".").pop();

    if (ext !== "csv" && ext !== "xls" && ext !== "xlsx") {
      dispatch(uploadCSVFailed("Only CSV files are allowed"));
      return;
    }

    dispatch(uploadCSV(file));
  };

  const clearCSV = () => {
    dispatch(clearAll());
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
              <div className="csv-uploader-container">
                <div className="progress-wrapper">
                  <Progress animated color="primary" value={uploading} />
                </div>
                <input
                  type="file"
                  id="csv"
                  name="csv"
                  className="hidden"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  ref={inputRef}
                  onChange={event => uploadCSVChange(event)}
                />
                <div className="btn-container">
                  <div className="upload-btn-wrapper">
                    <Button
                      color="primary"
                      onClick={() => inputRef.current.click()}
                    >
                      Upload a CSV
                    </Button>
                  </div>
                  <div className="clear-btn-wrapper">
                    <Button
                      color="secondary"
                      disabled={!csv || loading}
                      onClick={clearCSV}
                    >
                      <i className="fas fa-redo clr-primary"></i>
                    </Button>
                  </div>
                </div>
              </div>
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
