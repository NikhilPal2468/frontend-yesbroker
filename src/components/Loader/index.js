// import React, { useContext } from "react";
// import LoadContext from "../../context/load-context";
// import Backdrop from "@mui/material/Backdrop";
// import loader from "../../../public/images/loader.gif";

// const Loader = () => {
//   const ctx = useContext(LoadContext);
//   return (
//     ctx.isLoading && (
//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={ctx.isLoading}
//       >
//         <img
//           src={loader}
//           alt="loader"
//           style={{ display: "block", width: "auto" }}
//         />
//       </Backdrop>
//     )
//   );
// };

// export default Loader;
import React, { useContext } from "react";
import { LoadContext } from "../../context/load-context";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  const { isLoading } = useContext(LoadContext);
  return (
    isLoading && (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  );
};

export default Loader;
