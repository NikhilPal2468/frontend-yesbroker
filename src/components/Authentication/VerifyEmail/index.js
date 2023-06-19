import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setUserDetails } from "../../../store/actions";
import { useDispatch } from "react-redux";

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
  return <div>{verified ? "email verified" : errMsg}</div>;
};

export default VerifyEmail;
