import axios from "axios";
import styles from "./styles.module.css";
import React, { useContext, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { AuthContext } from "../../context/AuthContext";

function LikeHandler({ houses_id }) {
  const [liked, setLiked] = useState(false);
  const { setShowLogin, isLoggedIn } = useContext(AuthContext);

  const likeHandler = async (houses_id) => {
    if (isLoggedIn)
      try {
        const { data } = await axios.post(
          "/secure/api/user/property/shortlist",
          {
            propertyId: houses_id,
            propertyType: "house",
          }
        );
        console.log("data:", data);
        setLiked((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    else {
      setShowLogin(true);
    }
  };

  return (
    <div
      className={`p-1 rounded ms-2 ${styles.likeBorder}`}
      role="button"
      onClick={() => {
        likeHandler(houses_id);
      }}
    >
      {liked ? (
        <HiHeart size={28} color="#6c63ff" />
      ) : (
        <HiOutlineHeart size={28} color="#6c63ff" />
      )}
    </div>
  );
}

export default LikeHandler;
