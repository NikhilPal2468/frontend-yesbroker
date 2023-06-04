import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useSelector } from "react-redux";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import axios from "axios";

function ProfilePage() {
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const userDetails = useSelector((state) => state.user?.userDetails);

  const { name, email, phone_number, id, verified } = userDetails || {};

  useEffect(() => {
    setNewEmail(email);
    setNewName(name);
    setNewPhoneNumber(phone_number);
  }, [userDetails]);

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/secure/api/updateProfile", {
        id,
        newName,
        newEmail,
        newPhoneNumber,
      });
      console.log("data:", data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-100">
      <div className="row h-100">
        <div className="col-12 col-lg-3">
          <SideBar />
        </div>
        <div className="col-12 col-lg-9">
          <div className="container">
            <p className="fw-bold border-bottom py-4">Edit Your Profile</p>
            <form onSubmit={saveProfile}>
              <div className="row gap-4 p-2 m-2">
                <p className="col">Name</p>
                <div className="d-flex w-50">
                  <input
                    type="text"
                    onChange={(e) => setNewName(e.target.value)}
                    value={newName}
                    className="col"
                  />
                </div>
              </div>
              <div className="row gap-4 p-2 m-2">
                <p className="col">Email Address</p>
                <div className="d-flex w-50 align-items-center">
                  <input
                    type="email"
                    onChange={(e) => setNewEmail(e.target.value)}
                    value={newEmail}
                    className="col"
                    disabled={verified}
                  />
                  <BsFillExclamationTriangleFill size={25} color="#bc0b0b" />
                </div>
              </div>
              <div className="row gap-4 p-2 m-2">
                <p className="col">Phone No.</p>
                <div className="d-flex w-50 align-items-center">
                  <input
                    type="tel"
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    value={newPhoneNumber}
                    className="col"
                    disabled
                  />
                  <TiTick size={30} color="green" />
                </div>
              </div>
              <button className={`rounded mt-4`}>Save Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
