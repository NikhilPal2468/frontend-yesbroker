import React from "react";
import Sidebar from "./SideBar/sidebar";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Gallery() {
  const location = useLocation();

  const handleImageUpload = async () => {
    try {
      const { files } = document.querySelector('input[type="file"]');
      const formData = new FormData();
      formData.append("file", files[0]);

      // replace this with your upload preset name
      const cloud_name = "dyjzmmb1d";
      const uploadPreset = "bvijgapr";

      const data = await axios.post(
        `https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            upload_preset: uploadPreset,
          },
        }
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className={`d-flex flex-row justify-content-center`}>
        <div className={`w-20 ${styles.container}`}>
          <Sidebar pathname={location.pathname} />
        </div>
        <div
          className={`w-75 ms-2 px-4 d-flex flex-column ${styles.container}`}
        >
          <h5 className="ps-4 py-4 border-bottom">Amenities</h5>
          <form>
            <div className="form-group">
              <input type="file" />
            </div>

            <button type="button" className="btn" onClick={handleImageUpload}>
              Submit
            </button>
            <button type="button" className="btn widget-btn">
              Upload Via Widget
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
