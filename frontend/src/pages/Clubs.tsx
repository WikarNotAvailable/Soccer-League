import axios from "axios";
import React, { useEffect, useState } from "react";

export const Clubs = () => {
  const [clubs, setClubs] = useState();

  useEffect(() => {
    const getClubs = async () => {
      const res = await axios.get("http://localhost:8080/take/Clubs");
      console.log(res);
    };

    getClubs();
  }, []);

  return <div>Clubs</div>;
};
