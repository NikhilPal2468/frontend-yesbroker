import React, { useContext, useEffect, useState } from "react";
// import styles from "./styles.module.css";
import axios from "axios";
import PgCard from "../PgCard";
import { LoadContext } from "../../../context/load-context";
import useDebounceQuery from "../../hooks/useDebounceQuery";

const PgList = ({
  propertyType = "pg",
  city = "",
  locality = "",
  preferredTenants = [],
  parking = [],
  withImage = false,
  userDetails = {},
  attachedBathroom = false,
  preferredTenantsPG = [],
  foodType = [],
  roomType = [],
}) => {
  const [pgs, setPgs] = useState([]);
  const { setLoading, isReset, setReset } = useContext(LoadContext);

  const shortlistArray = [...(userDetails ? userDetails.pg_shortlists : [])];

  const { query: priceDebounced = [] } = useDebounceQuery();

  useEffect(() => {
    const fetchData = async () => {
      let payload = {
        city: city,
        text: [locality],
        pgNo: "1",
        propertyType,
        filters: {
          preferred_tenants:
            preferredTenantsPG.length === 1 ? undefined : preferredTenantsPG,
          // price_greater_than: priceDebounced?.[0],
          // price_less_than: priceDebounced?.[1],

          property_with_image: withImage === false ? undefined : withImage,
        },
      };

      try {
        setLoading(true);

        // get all pg properties
        const { data } = await axios.post(
          "/public/api/listProperties",
          payload
        );

        const { allpgs = [], totalCount = 0 } = data || {};
        console.log("allpgs:", allpgs);
        console.log("totalCount:", totalCount);
        setPgs(allpgs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!isReset) {
      fetchData();
    } else {
      setReset(false);
    }
  }, [city, locality, preferredTenants, priceDebounced, parking, withImage]);

  // useEffect(() => {
  //   debounceQuery(price);
  // }, [debounceQuery, price]);

  // const pgs = [
  //   {
  //     pg_id: "cdhvbfhvfvhfvbfvfv",
  //     pg_name: "PG-1",
  //     locality: "HBFB HF F HFNF JBFBF",
  //     single_room: true,
  //     single_room_rent: 20000,
  //     single_room_deposit: 20000,

  //     double_room: true,
  //     double_room_rent: 20000,
  //     double_room_deposit: 20000,

  //     triple_room: true,
  //     triple_room_rent: 20000,
  //     triple_room_deposit: 20000,

  //     four_room: true,
  //     four_room_rent: 20000,
  //     four_room_deposit: 20000,

  //     food_available: true,

  //     breakfast: true,
  //     lunch: false,
  //     dinner: true,
  //   },
  //   {
  //     pg_id: "cdhvbfhvfvhfvbfvfv",
  //     pg_name: "PG-1",
  //     locality: "HBFB HF F HFNF JBFBF",
  //     single_room: true,
  //     single_room_rent: 20000,
  //     single_room_deposit: 20000,

  //     double_room: true,
  //     double_room_rent: 20000,
  //     double_room_deposit: 20000,

  //     triple_room: true,
  //     triple_room_rent: 20000,
  //     triple_room_deposit: 20000,

  //     four_room: true,
  //     four_room_rent: 20000,
  //     four_room_deposit: 20000,

  //     food_available: true,

  //     breakfast: true,
  //     lunch: false,
  //     dinner: true,
  //   },
  // ];

  return pgs.length ? (
    <div className="p-1 col-12 col-md-7 col-lg-8">
      {pgs.map((pg) => {
        const {
          pgs_id = "",
          pg_name = "",
          locality = "",
          preferred_tenants = "",
          images,
          single_room = true,
          single_room_rent = 20000,
          single_room_deposit = 20000,

          double_room = true,
          double_room_rent = 20000,
          double_room_deposit = 20000,

          triple_room = true,
          triple_room_rent = 20000,
          triple_room_deposit = 20000,

          four_room = true,
          four_room_rent = 20000,
          four_room_deposit = 20000,

          food_available = true,

          breakfast = true,
          lunch = false,
          dinner = true,
          available_from,
        } = pg || {};

        return (
          <PgCard
            key={pgs_id}
            pgs_id={pgs_id}
            pg_name={pg_name}
            locality={locality}
            single_room={single_room}
            single_room_rent={single_room_rent}
            single_room_deposit={single_room_deposit}
            double_room={double_room}
            double_room_rent={double_room_rent}
            double_room_deposit={double_room_deposit}
            triple_room={triple_room}
            triple_room_rent={triple_room_rent}
            triple_room_deposit={triple_room_deposit}
            four_room={four_room}
            four_room_rent={four_room_rent}
            four_room_deposit={four_room_deposit}
            food_available={food_available}
            breakfast={breakfast}
            lunch={lunch}
            dinner={dinner}
            preferred_tenants={preferred_tenants}
            available_from={available_from}
            userDetails={userDetails}
            shortlistArray={shortlistArray}
            images={images}
            propertyType={propertyType}
            attachedBathroom={attachedBathroom}
            preferredTenantsPG={preferredTenantsPG}
            foodType={foodType}
            roomType={roomType}
          />
        );
      })}
    </div>
  ) : (
    <div>No properties to show for now</div>
  );
};
export default PgList;
