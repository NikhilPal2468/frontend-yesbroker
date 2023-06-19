import axios from "axios";
import styles from "./styles.module.css";
import React, { useContext, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { AuthContext } from "../../context/AuthContext";

function LikeHandler({ userDetails, houses_id }) {
  const [liked, setLiked] = useState(false);
  const { setShowLogin } = useContext(AuthContext);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverContent, setPopoverContent] = useState("");
  const handleShowPopover = ({ shortlist }) => {
    if (shortlist) {
      setPopoverContent("Click to Unshortlist");
    } else {
      setPopoverContent("Click to Shortlist");
    }
    setShowPopover(true);
  };
  const handleHidePopover = () => {
    setShowPopover(false);
  };

  const likeHandler = async (houses_id) => {
    if (userDetails)
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
    <div className="position-relative">
      <div
        className={`${styles.popover} ${
          showPopover ? styles.show_popover : styles.hide_popover
        }`}
      >
        {popoverContent}
      </div>
      <div
        className={`p-1 rounded ms-2 ${styles.likeBorder}`}
        role="button"
        onClick={() => {
          likeHandler(houses_id);
        }}
      >
        {liked ? (
          <HiHeart
            onMouseEnter={() => {
              handleShowPopover({ shortlist: true });
            }}
            onMouseLeave={() => {
              handleHidePopover({ shortlist: true });
            }}
            size={28}
            color="#6c63ff"
          />
        ) : (
          <HiOutlineHeart
            onMouseEnter={() => {
              handleShowPopover({ shortlist: false });
            }}
            onMouseLeave={() => {
              handleHidePopover({ shortlist: false });
            }}
            size={28}
            color="#6c63ff"
          />
        )}
      </div>
    </div>
  );
}

export default LikeHandler;
