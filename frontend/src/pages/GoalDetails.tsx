import { Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addGoalReducer } from "../reducers/addGoalReducer";
import { addMatchReducer } from "../reducers/addMatchReducer";
import { Club } from "../types/Clubs";
import { Goal } from "../types/Goals";
import { Match } from "../types/Matches";
import { Player } from "../types/Players";

export const GoalDetails = () => {
  const [goal, setGoal] = useState<Goal>();
  const [match, setMatch] = useState<Match>();
  const [club, setClub] = useState<Club>();
  const [player, setPlayer] = useState<Player>();
  const [matches, setMatches] = useState<Match[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [matchesOptions, setMatchesOptions] = useState<any>([]);
  const [clubsOptions, setClubsOptions] = useState<any>([]);
  const [playersOptions, setPlayersOptions] = useState<any>([]);
  const params = useParams();
  const navigate = useNavigate();
  const [formState, dispatchForm] = useReducer(addGoalReducer, {
    minute: goal?.minute ?? null,
    playerID: goal?.playerID ?? null,
    matchID: goal?.matchID ?? null,
    clubID: goal?.clubID ?? null
  });

  const getGoal = async () => {
    const res = await axios.get(
      `http://localhost:8080/take/Goals/${params.id}`
    );
    setGoal(res.data);
    getPlayer(res.data.playerID);
    getMatch(res.data.matchID);
    getClub(res.data.clubID);
    dispatchForm({ type: "MINUTE_CHANGE", payload: res.data.minute });
    dispatchForm({ type: "PLAYER_CHANGE", payload: res.data.playerID });
    dispatchForm({ type: "CLUB_CHANGE", payload: res.data.clubID });
    dispatchForm({ type: "MATCH_CHANGE", payload: res.data.matchID });
  };

  const getMatches = async () => {
    const res = await axios.get("http://localhost:8080/take/Matches");
    setMatches(res.data.matches);
    let arr: any[] = [];
    res.data.matches.forEach((match: Match) =>
      arr.push({ label: match.matchDate, value: match.id })
    );
    setMatchesOptions(arr);
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

  const getPlayer = async (id: number) => {
    const res = await axios.get(`http://localhost:8080/take/Players/${id}`);
    setPlayer(res.data);
  };

  const getMatch = async (id: number) => {
    const res = await axios.get(`http://localhost:8080/take/Matches/${id}`);
    setMatch(res.data);
  };

  const getClub = async (id: number) => {
    const res = await axios.get(`http://localhost:8080/take/Clubs/${id}`);
    setClub(res.data);
  };

  useEffect(() => {
    getGoal();
    getMatches();
    getClubs();
    getPlayers();
  }, []);

  const handleEditGoal = async () => {
    if (
      formState.minute !== "" &&
      formState.playerID !== null &&
      formState.matchID !== null &&
      formState.clubID !== null
    ) {
      const data = { ...formState, id: params.id };
      delete data.playerID;
      delete data.matchID;
      delete data.clubID;
      console.log("data", JSON.stringify(data));
      const res = await axios({
        method: "PUT",
        url: `http://localhost:8080/take/Goals?playerID=${formState.playerID}&matchID=${formState.matchID}&clubID=${formState.clubID}`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res);
      getGoal();
    }
  };

  const handleDeleteGoal = async () => {
    const res = await axios.delete(
      `http://localhost:8080/take/Goals/${params.id}`
    );
    if (res.data === "Goal deleted") {
      navigate("/goals");
    }
  };

  return (
    <Flex justify="space-between" w="100%" gap="32px">
      <Flex flexDir="column" gap="16px" w="50%">
        <Text fontSize="24px" fontWeight="600" mb="16px">
          Goal Details
        </Text>
        <Flex flexDir="column" gap="8px">
          <Text fontWeight="700">
            Minute of the goal:&nbsp;
            <Text fontWeight="400">{goal?.minute}</Text>
          </Text>
          <Text fontWeight="700">
            Player:&nbsp;
            <Text fontWeight="400">
              {player?.firstName}&nbsp;{player?.surname}
            </Text>
          </Text>
          <Text fontWeight="700">
            Club:&nbsp;
            <Text fontWeight="400">{club?.name}</Text>
          </Text>
          <Text fontWeight="700">
            Match date:&nbsp;
            <Text fontWeight="400">{match?.matchDate}</Text>
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="8px" w="50%">
        <Input
          placeholder="Minute"
          value={formState?.minute}
          onChange={(e: any) =>
            dispatchForm({ type: "MINUTE_CHANGE", payload: e.target.value })
          }
          type="number"
        />
        <Select
          placeholder="Select player"
          value={formState?.playerID}
          options={playersOptions}
          onChange={(e: any) =>
            dispatchForm({ type: "PLAYER_CHANGE", payload: e.value })
          }
        />
        <Select
          placeholder="Select match"
          value={formState?.matchID}
          options={matchesOptions}
          onChange={(e: any) =>
            dispatchForm({ type: "MATCH_CHANGE", payload: e.value })
          }
        />
        <Select
          placeholder="Select club"
          value={formState?.clubID}
          options={clubsOptions}
          onChange={(e: any) =>
            dispatchForm({ type: "CLUB_CHANGE", payload: e.value })
          }
        />
        <Button
          onClick={handleEditGoal}
          bgColor="#ff3f3f"
          _hover={{ bgColor: "#ff3f3f", opacity: "0.7" }}
        >
          Edit Goal
        </Button>
        <Button
          onClick={handleDeleteGoal}
          bgColor="transparent"
          border="1px solid #ff3f3f"
          _hover={{ opacity: "0.7" }}
        >
          Delete Goal
        </Button>
      </Flex>
    </Flex>
  );
};
