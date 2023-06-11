import React from "react";
import { Row, Col } from "react-bootstrap";

import { ReactComponent as LoginSVG } from "../../assets/loginSVG.svg";

const stylingObject = {
  list: {
    listStyle: "none",
    padding: "0",
    paddingRight: "4px",
    marginTop: "2rem",
  },
};

export default function AuthModal() {
  return (
    <>
      <Col xs={12} md={4}>
        <Row className="d-flex flex-column align-items-center justify-content-center">
          <Col xs={6} md={12}>
            <LoginSVG />
          </Col>
          <Col xs={6} md={12} className="w-100 text-center">
            Login/Sign up
            <ul
              style={stylingObject.list}
              className="d-flex flex-column align-items-center justify-content-center text-start"
            >
              <li className="d-flex flex-row w-100">
                <p>✔</p>
                <p>Complete Assistance</p>
              </li>
              <li className="d-flex flex-col w-100">
                <p>✔</p>
                <p>Verified Properties</p>
              </li>
              <li className="d-flex flex-row w-100">
                <p>✔</p>
                <p>Thousands of new Listings daily</p>
              </li>
            </ul>
          </Col>
        </Row>
      </Col>
    </>
  );
}
