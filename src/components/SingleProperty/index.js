import React from "react";
import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.css";

import { useParams } from "react-router-dom";
const SingleProperty = () => {
  const { id } = useParams();
  console.log("id:", id);
  return (
    <div>
      <div className={styles.single_property}>
        <div className={styles.firstdiv}>
          <div className={styles.image_div}>
            photos
            <div
              id="carouselExampleInterval"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <img
                    src="https://images.unsplash.com/photo-1685452329316-d505335ca3d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    className="d-block w-100"
                    alt="a"
                  />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <img
                    src="https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=400&q=60"
                    className="d-block w-100"
                    alt="b"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=400&q=60"
                    className="d-block w-100"
                    alt="c"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className={styles.description_div}>description</div>
        </div>

        <div className={` ${styles.seconddiv}`}></div>
        <div className={` ${styles.thirddiv}`}></div>
        <div className={` ${styles.fourthdiv}`}></div>
        <div className={` ${styles.fifthdiv}`}></div>
        <div className={` ${styles.sixthdiv}`}></div>
      </div>
      <div className={styles.single_property}>SingleProperty</div>
    </div>
  );
};

export default SingleProperty;
