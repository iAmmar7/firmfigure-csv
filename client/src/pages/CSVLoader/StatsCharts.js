import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

// Charts
import Doughnut from "../AllCharts/echart/doughnutchart";
import Pie from "../AllCharts/echart/piechart";

function StatsCharts({ salesLabel, servicesLabels, salesData, servicesData }) {
  return (
    <Row>
      <Col lg="6">
        <Card>
          <CardBody>
            <h4 className="mt-0 header-title mb-4">Sale Stats</h4>
            <div id="doughnut-chart" className="e-chart">
              <Doughnut label={salesLabel} data={salesData} />
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col lg="6">
        <Card>
          <CardBody>
            <h4 className="mt-0 header-title mb-4">Service Stats</h4>
            <div id="pie-chart" className="e-chart">
              <Pie labels={servicesLabels} data={servicesData} />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default React.memo(StatsCharts);
