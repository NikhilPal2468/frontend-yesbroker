import React from "react";
import Sidebar from "./SideBar/sidebar";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";

function Gallery() {
  const location = useLocation();

  //   const [imageFiles, setImageFiles] = useState();

  return (
    <div className="container">
      <div className={`d-flex flex-row justify-content-center`}>
        <div className={`w-20 ${styles.container}`}>
          <Sidebar pathname={location.pathname} />
        </div>
        <div
          className={`w-75 ms-2 px-4 d-flex flex-column ${styles.container}`}
        >
          <h5 className="ps-4 py-4 border-bottom">Gallery</h5>
          <div role="button" className="w-100 px-4 py-2 m-2 border">
            <label for="image" class="btn">
              Add Photos
            </label>
            <input
              type="file"
              name="image"
              id="image"
              style={{ display: "none" }}
              className={`styles.image_input`}
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
