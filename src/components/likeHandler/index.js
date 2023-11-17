import axios from "axios";
import styles from "./styles.module.css";
import React, { useContext, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LikeHandler({
  propertyId,
  propertyType,
  shortlisted,
  userDetails = {},
  setShortlistedProperty = () => {},
}) {
  // console.log("lst", shortlisted, houses_id);

  const [liked, setLiked] = useState(shortlisted);
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

  const likeHandler = async (propertyId, propertyType) => {
    if (userDetails)
      try {
        const { data } = await axios.post(
          "/secure/api/user/property/shortlist",
          {
            propertyId: propertyId,
            propertyType: propertyType,
          }
        );

        setShortlistedProperty((prevList) => {
          let newShortlists = prevList?.filter(({ id }) => {
            return id !== propertyId;
          });
          return newShortlists;
        });

        setLiked((prev) => !prev);
      } catch (e) {
        console.log(e);
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
          likeHandler(propertyId, propertyType);
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
      <ToastContainer />
    </div>
  );
}

export default LikeHandler;
