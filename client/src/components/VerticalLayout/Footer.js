import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <div className="col-12">
              Petromin © {new Date().getFullYear()}{" "}
              <i className="mdi mdi-heart text-danger" /> Dashboard
            </div>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
