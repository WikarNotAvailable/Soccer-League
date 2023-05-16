import axios from "axios";
import React, { useEffect, useState } from "react";

export const Goals = () => {
  const [goals, setGoals] = useState();

  useEffect(() => {
    const getGoals = async () => {
      const res = await axios.get("http://localhost:8080/take/Goals");
      console.log(res.data);
    };

    getGoals();
  }, []);

  return <div>Goals</div>;
};
