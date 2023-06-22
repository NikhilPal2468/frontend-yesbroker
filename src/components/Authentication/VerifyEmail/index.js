import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { setUserDetails } from "../../../store/actions";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { id, email, token } = useParams();
  const [verified, setVerified] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/public/api/verifyEmail/${id}/${email}/${token}`
        );
        console.log("data:", data.message);
        setVerified(true);
        const { data1 } = await axios.get("/secure/api/user/me");
        dispatch(setUserDetails(data1));
        setErrMsg(data.message);
      } catch (e) {
        console.log(e?.response?.data?.message);
        setErrMsg(e?.response?.data?.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.content}`}>
        <div
          className={`${styles.message} flex-row gap-1 align-items-center justify-content-center p-2`}
        >
          <p className="fw-bold my-auto">
            {verified ? "Email Verified" : errMsg}
          </p>
          <img
            src={
              verified
                ? "https://th.bing.com/th/id/OIP.GO9-jv9gZ4MWSIPkL7uGQgHaH2?pid=ImgDet&rs=1"
                : "https://th.bing.com/th/id/OIP.cmTcUqX-2WFqJofdiwQLBQHaHa?pid=ImgDet&rs=1"
            }
            alt="{verified ? 'Success' : 'Error'}"
            className={`${styles.icon}`}
          />
        </div>
        <p className="mt-4 text-center">
          {verified ? (
            <button className={`${styles.RedirectBtn} px-3 py-1`}>
              <Link to="/" className={`${styles.LinkText}`}>
                Home
              </Link>
            </button>
          ) : (
            <button className={`${styles.RedirectBtn} px-3 py-1`}>
              <Link to="/user/myprofile" className={`${styles.LinkText}`}>
                Verify Email
              </Link>
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
