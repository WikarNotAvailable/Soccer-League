import axios from "axios";
import React, { useEffect, useState } from "react";

export const Matches = () => {
  const [matches, setMatches] = useState();

  useEffect(() => {
    const getMatches = async () => {
      const res = await axios.get("http://localhost:8080/take/Matches");
      console.log(res.data);
    };

    getMatches();
  }, []);

  return <div>Matches</div>;
};
