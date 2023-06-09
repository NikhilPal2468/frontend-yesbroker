import React from "react";
import { Container, Modal } from "react-bootstrap";
import styles from "./styles.module.css";

function OwnerModal({ showOnerContacted, setShowOwnerContacted }) {
  const handleModalClose = () => {
    setShowOwnerContacted(false);
  };
  return (
    <Modal
      show={showOnerContacted}
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
          <div className="p-4"></div>
          <div className="m-4"></div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default OwnerModal;
