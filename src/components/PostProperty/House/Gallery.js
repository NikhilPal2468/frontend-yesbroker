import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./SideBar/sidebar";
import styles from "./styles.module.css";
import { BsCameraFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import FinalModal from "../FinalModal";
import { LoadContext } from "../../../context/load-context";
const PICTURE_TYPES = [
  "Kitchen",
  "Bedroom",
  "Hall",
  "Dining",
  "Outside",
  "Bathroom",
  "Balcony",
];

function Gallery() {
  const location = useLocation();
  const { loadingHandler } = useContext(LoadContext);

  const { id: houseId } = useParams();
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const filesArray = Array.from(e.target.files);
    setImageFiles(filesArray);

    const formData = new FormData();

    for (let i = 0; i < filesArray.length; i++) {
      formData.append("image", filesArray[i]);
    }
  };

  const handleSubmit = (e) => {
    console.log("e:", e);
    setShowModal(true);
  };

  // To load images saved in db on intial load or refresh
  useEffect(() => {
    try {
      const fetchImageData = async (houseId) => {
        const response = await axios.get(
          `/secure/api/getHouseImage/${houseId}`
        );
        if (response.data) {
          setUploadedImages([...response.data]);
        }
      };

      fetchImageData(houseId);
    } catch (err) {
      console.log(err);
    }
  }, [houseId]);

  // To update uploaded images state on new image upload
  useEffect(() => {
    if (!imageFiles || imageFiles.length === 0) return;

    const formData = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("image", imageFiles[i]);
    }

    const uploadImages = async () => {
      try {
        loadingHandler(true);
        const response = await axios.post(
          `secure/api/newProperty/house/uploadImage/${houseId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        loadingHandler(false);
        if (response.data) {
          setUploadedImages((prev) => {
            if (prev) return [...prev, ...response.data];
            else return [...response.data];
          });
        }

        setImageFiles([]);
      } catch (error) {
        console.error(error);
      }
    };

    uploadImages();
  }, [imageFiles, houseId]);

  // To handle description change for each image
  const handleDescriptionChange = async (e, imageId) => {
    const description = e.target.value;

    try {
      await axios.put(
        `/secure/api/house/uploadImage/change-description/${imageId}`,
        {
          description: description,
        }
      );
      setUploadedImages((prevImages) => {
        let update = prevImages.map((curPhoto) => {
          if (curPhoto.id === imageId) {
            curPhoto.description = description;
          }
          return curPhoto;
        });
        return update;
      });
    } catch (err) {
      console.log(err);
    }
  };

  // To handle deletion of image
  const handleDelete = async (e, imageId) => {
    try {
      loadingHandler(true);
      await axios.delete(`/secure/api/house/deleteImage/${imageId}`);
      loadingHandler(false);
      setUploadedImages((prevImages) => {
        return prevImages.filter((curPhoto) => curPhoto.id !== imageId);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className={`d-flex flex-column flex-sm-row justify-content-center`}>
        <div className={`w-20 ${styles.container}`}>
          <Sidebar pathname={location.pathname} />
        </div>
        <div
          className={`w-75 ms-2 px-4 d-flex flex-column ${styles.container}`}
        >
          <h5 className="ps-4 py-4 border-bottom mx-8 p-4">Upload Photos</h5>
          <div role="button" className="px-4 py-2 m-2 border">
            <label htmlFor="image" className="btn w-100">
              <div className="m-4">
                {<BsCameraFill size="30" className={`${styles.icon}`} />}
                <p>Increase Your Response Rate:</p>
                <h5 className="mb-4">Add Photos to Get 5X More Inquiries!</h5>
                <span
                  className={`${styles.image_input} p-2 px-4 fw-semibold rounded`}
                  title="Please limit Photos below 5mb"
                >
                  Add Photos
                </span>
              </div>
            </label>
            <input
              type="file"
              name="image"
              id="image"
              style={{ display: "none" }}
              className={`${styles.image_input}`}
              onChange={handleInputChange}
              multiple
            />
          </div>
          <div className={`${styles.image_container}`}>
            {uploadedImages &&
              uploadedImages.map((image) => {
                console.log(image);
                return (
                  <div
                    className={`card ${styles.card_image}`}
                    key={image.filename}
                  >
                    <img
                      className={`card-img-top ${styles.image}`}
                      src={image.media_url}
                      alt={image.filename}
                    />
                    <div className="card-body border d-flex align-items-center justify-content-center">
                      <select
                        name="description"
                        id="description"
                        onChange={(e) => {
                          handleDescriptionChange(e, image.id);
                        }}
                        className="form-control"
                      >
                        <option value="">Picture Type</option>
                        {PICTURE_TYPES.map((cur) => {
                          return (
                            <option key={cur} value={cur}>
                              {cur}
                            </option>
                          );
                        })}
                      </select>
                      <p
                        className="my-auto ms-2"
                        role="button"
                        onClick={(e) => {
                          handleDelete(e, image.id);
                        }}
                      >
                        {<MdDelete size={30} />}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            className={`w-100 justify-content-end px-2 my-4 fw-semibold py-1 rounded ${styles.button}`}
          >
            Finish Posting
          </button>
        </div>
      </div>
      {showModal && (
        <FinalModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default Gallery;
