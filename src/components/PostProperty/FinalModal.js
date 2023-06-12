import { faHouseLaptop, faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function FinalModal({ showModal, setShowModal }) {
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  const redirectToPage = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <Modal
      show={showModal}
      onHide={handleModalClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className={`${styles.modal}`}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center"></Modal.Title>
      </Modal.Header>

      <Modal.Body className="show-grid">
        <Container className="text-center d-flex justify-content-center flex-column">
          <div className="p-4">
            <FontAwesomeIcon icon={faHouseLaptop} bounce size="2xl" />
            <h3>Congratulations!! Your property is listed</h3>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            Now take a
            <span className="px-2 pb-1">
              <FontAwesomeIcon icon={faMugHot} size="lg" />
            </span>
            while we verify your property
          </div>
          <div className="m-4">
            <Button variant="success" onClick={redirectToPage}>
              View My Listing
            </Button>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default FinalModal;
