import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

// Icon Images
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";

function StatsCards({ sales, services, totalAmount }) {
  return (
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
                {sales || 0}
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
                {services || 0}
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
                {totalAmount || 0}
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
  );
}

export default React.memo(StatsCards);
