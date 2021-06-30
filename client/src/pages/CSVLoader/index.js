import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Progress,
} from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

function CSVLoader() {
  const [uploading, setUploading] = useState(0)
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
                  <Button color="primary">Upload a CSV</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CSVLoader
