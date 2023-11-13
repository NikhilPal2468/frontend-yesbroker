import React, { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OwnerModal({
  showOwnersContacted,
  setShowOwnersContacted,
  propertyId,
  propertyType,
}) {
  const [ownerData, setOwnerData] = useState(null);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowOwnersContacted(false);
  };

  useEffect(() => {
    const fetchData = async (propertyId, propertyType) => {
      try {
        const { data } = await axios.post(
          `/secure/api/user/listings/get-owner-details`,
          {
            propertyId,
            propertyType,
          }
        );

        setOwnerData(data);
      } catch (e) {
        console.log(e?.response?.data?.message);
        toast.error(e?.response?.data?.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };
    if (propertyId) {
      fetchData(propertyId, propertyType);
    }
  }, [propertyId]);

  const handlePremiumClick = () => {
    navigate("/premium");
  };

  if (!ownerData) {
    return <ToastContainer />;
  }
  return (
    <Modal
      show={showOwnersContacted}
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
          {ownerData && ownerData?.exists === true ? (
            <div className="card mb-2 p-4">
              <div className="card-img-top m-2 mb-4">
                <button
                  onClick={handlePremiumClick}
                  className={`px-2 py-1 ${styles.button_premium}`}
                >
                  Want Hassle Free Homes? Get Premium Today!
                </button>
              </div>
              <div>
                <h5 className="card-title">
                  Here&apos;s the details for the owner.
                </h5>
                <p className="card-text m-1">Name: {ownerData?.name}</p>
                <p className="card-text m-1">Email: {ownerData?.email}</p>
                <p className="card-text m-1">
                  Phone: {ownerData?.phone_number}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={handlePremiumClick}
                className={`px-2 py-1 ${styles.button_premium}`}
              >
                Want Hassle Free Homes? Get Premium Today!
              </button>
              <div className="my-4">
                <h5 className="card-title">
                  Here&apos;s the details for the owner.
                </h5>
                <p className={`card-text m-1 ${styles.blurText}`}>
                  Email: aryan@gmail.com
                </p>
                <p className={`card-text m-1 ${styles.blurText}`}>
                  Name: Aryan
                </p>
                <p className={`card-text m-1 ${styles.blurText}`}>
                  Phone: 8756948568
                </p>
              </div>
              <p className="py-2 px-1">
                You have reached your max free limits. Please buy a suitable
                plan to continue the services.
              </p>
            </div>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default OwnerModal;
