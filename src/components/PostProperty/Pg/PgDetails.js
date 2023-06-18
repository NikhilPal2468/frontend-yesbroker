import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./SideBar/sidebar";
import { LoadContext } from "../../../context/load-context";

function PgDetails() {
  return <div>PgDetails</div>;
}

export default PgDetails;
