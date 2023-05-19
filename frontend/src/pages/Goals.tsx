import { Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { addGoalReducer } from "../reducers/addGoalReducer";
import { Goal } from "../types/Goals";

export const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>();
  const [formState, dispatchForm] = useReducer(addGoalReducer, {
    minute: null,
    playerID: null,
    matchID: null,
    clubID: null
  });

  const getGoals = async () => {
    const res = await axios.get("http://localhost:8080/take/Goals");
    setGoals(res.data.goals);
  };

  useEffect(() => {
    getGoals();
  }, []);

  const handleAddGoal = async () => {
    if (
      formState.minute !== "" &&
      formState.playerID !== null &&
      formState.matchID !== null &&
      formState.clubID !== null
    ) {
      const data = { ...formState };
      delete data.playerID;
      delete data.matchID;
      delete data.clubID;
      console.log("data", JSON.stringify(data));
      const res = await axios({
        method: "post",
        url: `http://localhost:8080/take/Goals?playerID=${formState.playerID}&matchID=${formState.matchID}&clubID=${formState.clubID}`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res);
      getGoals();
    }
  };

  return (
    <Flex justify="space-between" w="100%" gap="32px">
      <Flex flexDir="column" gap="16px" w="50%">
        <Text fontSize="24px" fontWeight="600" mb="16px">
          Goals list
        </Text>
        {goals?.map((goal: Goal, index: number) => {
          return (
            <Flex
              p="8px"
              gap="8px"
              w="100%"
              justify="space-between"
              align="center"
              key={index}
              bgColor="#f0f0f0"
              borderRadius="10px"
            >
              <Text fontSize="14px" fontWeight="600">
                {goal.minute}
              </Text>
            </Flex>
          );
        })}
      </Flex>
      <Flex flexDir="column" gap="8px" w="50%">
        <Input
          placeholder="Minute"
          onChange={(e: any) =>
            dispatchForm({ type: "MINUTE_CHANGE", payload: e.target.value })
          }
          type="number"
        />
        <Input
          placeholder="Player ID"
          onChange={(e: any) =>
            dispatchForm({ type: "PLAYER_CHANGE", payload: e.target.value })
          }
          type="number"
        />
        <Input
          placeholder="Match ID"
          onChange={(e: any) =>
            dispatchForm({ type: "MATCH_CHANGE", payload: e.target.value })
          }
          type="number"
        />
        <Input
          placeholder="Club ID"
          onChange={(e: any) =>
            dispatchForm({ type: "CLUB_CHANGE", payload: e.target.value })
          }
          type="number"
        />
        <Button
          onClick={handleAddGoal}
          bgColor="#ff3f3f"
          _hover={{ bgColor: "#ff3f3f", opacity: "0.7" }}
        >
          Add Goal
        </Button>
      </Flex>
    </Flex>
  );
};
