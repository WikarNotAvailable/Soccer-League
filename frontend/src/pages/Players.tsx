import axios from "axios";
import React, { useEffect, useState } from "react";

export const Players = () => {
  const [players, setPlayers] = useState();

  useEffect(() => {
    const getPlayers = async () => {
      const res = await axios.get("http://localhost:8080/take/Players");
      console.log(res.data);
    };

    getPlayers();
  }, []);

  return <div>Players</div>;
};
