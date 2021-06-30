import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
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
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";
import servicesIcon4 from "../../assets/images/services-icon/04.png";

// Charts
import SparkLine from "../AllCharts/sparkline/sparkline";
import SparkLine1 from "../AllCharts/sparkline/sparkline1";

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

  const sales = (csvData || []).filter(
    data => data.ProductType === "Sale"
  ).length;
  const service = (csvData || []).filter(
    data => data.ProductType === "Service"
  ).length;
  const totalAmount = (csvData || []).reduce(
    (a, b) => +a + +(b["Amount"] || 0),
    0
  );

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
                      {sales}
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
                      {service}
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

          {/* Table */}
          <Row>
            <Col xl={9}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Latest Transaction</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">(#) Id</th>
                          <th scope="col">Name</th>
                          <th scope="col">Date</th>
                          <th scope="col">Amount</th>
                          <th scope="col" colSpan="2">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">#14256</th>
                          <td>
                            <div>
                              <img
                                src={user2}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Philip Smead
                            </div>
                          </td>
                          <td>15/1/2018</td>
                          <td>$94</td>
                          <td>
                            <span className="badge bg-success">Delivered</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#14257</th>
                          <td>
                            <div>
                              <img
                                src={user3}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Brent Shipley
                            </div>
                          </td>
                          <td>16/1/2019</td>
                          <td>$112</td>
                          <td>
                            <span className="badge bg-warning">Pending</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#14258</th>
                          <td>
                            <div>
                              <img
                                src={user4}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Robert Sitton
                            </div>
                          </td>
                          <td>17/1/2019</td>
                          <td>$116</td>
                          <td>
                            <span className="badge bg-success">Delivered</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#14259</th>
                          <td>
                            <div>
                              <img
                                src={user5}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Alberto Jackson
                            </div>
                          </td>
                          <td>18/1/2019</td>
                          <td>$109</td>
                          <td>
                            <span className="badge bg-danger">Cancel</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#14260</th>
                          <td>
                            <div>
                              <img
                                src={user6}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              David Sanchez
                            </div>
                          </td>
                          <td>19/1/2019</td>
                          <td>$120</td>
                          <td>
                            <span className="badge bg-success">Delivered</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#14261</th>
                          <td>
                            <div>
                              <img
                                src={user2}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Philip Smead
                            </div>
                          </td>
                          <td>15/1/2018</td>
                          <td>$94</td>
                          <td>
                            <span className="badge bg-warning">Pending</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3}>
              <Card>
                <CardBody>
                  <div>
                    <h4 className="card-title mb-4">Sales Analytics</h4>
                  </div>
                  <div className="wid-peity mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Online</p>
                          <h5 className="mb-4">1,542</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <SparkLine />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wid-peity mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Offline</p>
                          <h5 className="mb-4">6,451</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <SparkLine1 />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wid-peity mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Marketing</p>
                          <h5>84,574</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <SparkLine />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wid-peity mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <p className="text-muted">Offline</p>
                          <h5 className="mb-4">6,451</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <SparkLine1 />
                        </div>
                      </div>
                    </div>
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
