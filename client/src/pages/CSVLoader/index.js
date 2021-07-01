import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import moment from "moment";
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
// import { uploadCSV, apiError, uploadCSVFailed } from "../../store/actions";

// import images
import user1 from "../../assets/images/users/user-1.jpg";
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";

// Charts
import Doughnut from "../AllCharts/echart/doughnutchart";
import Pie from "../AllCharts/echart/piechart";

import axios from "axios";

import Breadcrumbs from "../../components/Common/Breadcrumb";

const API_URL =
  process.env.REACT_APP_NODE_ENV === "development"
    ? `${process.env.REACT_APP_PETROMIN_CSV_DEV_BE_URL}/api`
    : `${process.env.REACT_APP_PETROMIN_CSV_PROD_BE_URL}/api`;

function CSVLoader(props) {
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const inputRef = useRef(null);

  // const { error, loading, csv } = props;

  const uploadCSVChange = async event => {
    event.stopPropagation();
    event.preventDefault();
    setError(null);
    setUploading(0);

    const file = event.target.files[0];

    if (!file) return;

    const ext = file?.name.split(".").pop();

    if (ext !== "csv" && ext !== "xls" && ext !== "xlsx") {
      setError("Only CSV files are allowed");
      // uploadCSVFailed("Only CSV files are allowed");
    }

    const data = new FormData();
    data.append("csv", file);

    const apiRespone = await axios.post(API_URL + "/user/csv-upload", data, {
      headers: {
        Authorization: localStorage.authToken,
      },
      onUploadProgress: progressEvent => {
        if (progressEvent.lengthComputable) {
          setUploading(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        }
      },
    });

    if (apiRespone.data.success) setCSVData(apiRespone.data.csvData);
    else setError("Unable to upload the CSV");
  };

  console.log("csvData", csvData);

  const salesData = (csvData || []).filter(data => data.ProductType === "Sale");
  const servicesData = (csvData || []).filter(
    data => data.ProductType === "Service"
  );
  const totalAmount = (csvData || []).reduce(
    (a, b) => +a + +(b["Amount"] || 0),
    0
  );

  const salesItems = [...new Set((salesData || [])?.map(data => data.Name))];
  const servicesItems = [
    ...new Set((servicesData || [])?.map(data => data.Name)),
  ];

  const salesChartData = salesItems.map(item => ({
    name: item,
    value: salesData.reduce((init, data) => {
      return data.Name === item ? init + +data.Amount : init;
    }, 0),
  }));

  const servicesChartData = servicesItems.map(item => ({
    name: item,
    value: servicesData.reduce((init, data) => {
      return data.Name === item ? init + +data.Amount : init;
    }, 0),
  }));

  console.log("servicesChartData", servicesChartData);

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
          <Row>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Sales
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {salesData.length}
                      <i className="mdi mdi-arrow-split-horizontal text-muted ms-2"></i>
                    </h4>
                  </div>
                  <div className="pt-2">
                    <p className="text-white-50 mb-0 mt-1">In this CSV</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Service
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {servicesData.length}
                      <i className="mdi mdi-arrow-split-horizontal text-muted ms-2"></i>
                    </h4>
                  </div>
                  <div className="pt-2">
                    <p className="text-white-50 mb-0 mt-1">In this CSV</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Total Amount
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {totalAmount}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                  </div>
                  <div className="pt-2">
                    <p className="text-white-50 mb-0 mt-1">In this CSV</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row>
            <Col lg="6">
              <Card>
                <CardBody>
                  <h4 className="mt-0 header-title mb-4">Sale Stats</h4>
                  <div id="doughnut-chart" className="e-chart">
                    <Doughnut label={salesItems} data={salesChartData} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <CardBody>
                  <h4 className="mt-0 header-title mb-4">Service Stats</h4>
                  <div id="pie-chart" className="e-chart">
                    <Pie labels={servicesItems} data={servicesChartData} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Table */}
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Summary</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Date</th>
                          <th scope="col">Attendent Name</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Product Type</th>
                          <th scope="col">Unit Price</th>
                          <th scope="col">Quanitiy</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {csvData.length < 1
                          ? null
                          : csvData.map((data, index) => (
                              <tr key={data._id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                  {moment(data.Date).format("DD/MM/YYYY")}
                                </td>
                                <td>
                                  <div>
                                    <img
                                      src={
                                        [
                                          user1,
                                          user2,
                                          user3,
                                          user4,
                                          user5,
                                          user6,
                                        ][
                                          Math.floor(
                                            Math.random() *
                                              [
                                                user1,
                                                user2,
                                                user3,
                                                user4,
                                                user5,
                                                user6,
                                              ].length
                                          )
                                        ]
                                      }
                                      alt=""
                                      className="avatar-xs rounded-circle me-2"
                                    />{" "}
                                    {data.AttendentName}
                                  </div>
                                </td>
                                <td>{data.CustomerName}</td>
                                {data.ProductType === "Sale" ? (
                                  <td>
                                    <span className="badge bg-success">
                                      Sale
                                    </span>
                                  </td>
                                ) : (
                                  <td>
                                    <span className="badge bg-primary">
                                      Service
                                    </span>
                                  </td>
                                )}
                                <td>{data.ProductUnitPrice}</td>
                                <td>{data.ProductQuantityTotal}</td>
                                <td>{data.Amount}</td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

// const mapStatetoProps = state => {
//   const { csv, error, loading } = state.currentCSV;
//   return { csv, error, loading };
// };

// export default connect(mapStatetoProps, {
//   uploadCSV,
//   apiError,
//   uploadCSVFailed,
// })(CSVLoader);

export default CSVLoader;
