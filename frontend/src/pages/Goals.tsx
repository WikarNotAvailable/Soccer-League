import { Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useEffect, useReducer, useState } from "react";
import { addGoalReducer } from "../reducers/addGoalReducer";
import { Club } from "../types/Clubs";
import { Goal } from "../types/Goals";
import { Match } from "../types/Matches";
import { Player } from "../types/Players";

export const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>();
  const [matches, setMatches] = useState<Match[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matchesOptions, setMatchesOptions] = useState<any>([]);
  const [clubsOptions, setClubsOptions] = useState<any>([]);
  const [playersOptions, setPlayersOptions] = useState<any>([]);
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

  const getMatches = async () => {
    const res = await axios.get("http://localhost:8080/take/Matches");
    setMatches(res.data.matches);
    let arr: any[] = [];
    res.data.matches.forEach((match: Match) =>
      arr.push({ label: match.matchDate, value: match.id })
    );
    setClubsOptions(arr);
  };

  const getClubs = async () => {
    const res = await axios.get("http://localhost:8080/take/Clubs");
    setClubs(res.data.clubs);
    let arr: any[] = [];
    res.data.clubs.forEach((club: Club) =>
      arr.push({ label: club.name, value: club.id })
    );
    setClubsOptions(arr);
  };

  const getPlayers = async () => {
    const res = await axios.get("http://localhost:8080/take/Players");
    setPlayers(res.data.players);
    let arr: any[] = [];
    res.data.players.forEach((player: Player) =>
      arr.push({
        label: player.firstName + " " + player.surname,
        value: player.id
      })
    );
    setPlayersOptions(arr);
  };

  useEffect(() => {
    getGoals();
    getMatches();
    getClubs();
    getPlayers();
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
            <Link
              href={`/goals/${goal.id}`}
              p="8px"
              gap="8px"
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              key={index}
              bgColor="#f0f0f0"
              borderRadius="10px"
              display="flex"
              _hover={{ textDecoration: "none" }}
            >
              <Text fontSize="14px" fontWeight="600">
                {goal.minute}
              </Text>
            </Link>
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
        <Select
          placeholder="Select player"
          options={playersOptions}
          onChange={(e: any) =>
            dispatchForm({ type: "PLAYER_CHANGE", payload: e.value })
          }
        />
        <Select
          placeholder="Select match"
          options={matchesOptions}
          onChange={(e: any) =>
            dispatchForm({ type: "MATCH_CHANGE", payload: e.value })
          }
        />
        <Select
          placeholder="Select club"
          options={clubsOptions}
          onChange={(e: any) =>
            dispatchForm({ type: "CLUB_CHANGE", payload: e.value })
          }
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
