import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useEffect, useReducer, useState } from "react";
import { addMatchReducer } from "../reducers/addMatchReducer";
import { Club } from "../types/Clubs";
import { Match } from "../types/Matches";
import { Player } from "../types/Players";

export const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [clubsOptions, setClubsOptions] = useState<any>([]);
  const [playersOptions, setPlayersOptions] = useState<any>([]);
  const [formState, dispatchForm] = useReducer(addMatchReducer, {
    matchDate: "",
    score: "",
    playerIDs: [null],
    homeClubID: null,
    awayClubID: null
  });

  const getMatches = async () => {
    const res = await axios.get("http://localhost:8080/take/Matches");
    setMatches(res.data.matches);
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
    getMatches();
    getClubs();
    getPlayers();
  }, []);

  const handleAddMatch = async () => {
    if (
      formState.matchDate !== "" &&
      formState.score !== "" &&
      formState.homeClubID !== null &&
      formState.awayClubID !== null &&
      formState.playerIDs.find((id: number | null) => {
        return id === null;
      }) === undefined
    ) {
      const data = { ...formState };
      delete data.homeClubID;
      delete data.awayClubID;
      console.log("data", JSON.stringify(data));
      const res = await axios({
        method: "post",
        url: `http://localhost:8080/take/Matches?homeClubID=${formState.homeClubID}&awayClubID=${formState.awayClubID}`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res);
      getMatches();
    }
  };

  return (
    <Flex justify="space-between" w="100%" gap="32px">
      <Flex flexDir="column" gap="16px" w="50%">
        <Text fontSize="24px" fontWeight="600" mb="16px">
          Matches list
        </Text>
        {matches?.map((match: Match, index: number) => {
          return (
            <Link
              href={`/matches/${match.id}`}
              p="8px"
              gap="8px"
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              key={index}
              bgColor="#f0f0f0"
              borderRadius="10px"
              _hover={{ textDecoration: "none" }}
              display="flex"
            >
              <Text fontSize="14px" fontWeight="600">
                {match.matchDate}
              </Text>
              <Flex gap="8px" align="center" fontSize="12px">
                <Text>{match.score}</Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
      <Flex flexDir="column" gap="8px" w="50%">
        <Input
          placeholder="Match date"
          onChange={(e: any) =>
            dispatchForm({ type: "DATE_CHANGE", payload: e.target.value })
          }
          type="date"
        />
        <Input
          placeholder="Score"
          onChange={(e: any) =>
            dispatchForm({ type: "SCORE_CHANGE", payload: e.target.value })
          }
        />
        <Select
          placeholder="Select home club"
          options={clubsOptions}
          onChange={(e: any) =>
            dispatchForm({ type: "HOMECLUB_CHANGE", payload: e.value })
          }
        />
        <Select
          placeholder="Select away club"
          options={clubsOptions}
          onChange={(e: any) =>
            dispatchForm({ type: "AWAYCLUB_CHANGE", payload: e.value })
          }
        />
        {formState.playerIDs.map((playerID: number, index: number) => {
          return (
            <Flex gap="8px" align="center" key={index}>
              <Flex w="100%">
                <Select
                  chakraStyles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%"
                    })
                  }}
                  placeholder="Select player"
                  options={playersOptions}
                  onChange={(e: any) =>
                    dispatchForm({
                      type: "PLAYERS_CHANGE",
                      payload: [
                        ...formState.playerIDs.slice(0, index),
                        +e.value,
                        ...formState.playerIDs.slice(index + 1)
                      ]
                    })
                  }
                />
              </Flex>
              {formState.playerIDs.length > 1 && (
                <DeleteIcon
                  cursor="pointer"
                  onClick={() => {
                    dispatchForm({
                      type: "PLAYERS_CHANGE",
                      payload: [
                        ...formState.playerIDs.slice(0, index),
                        ...formState.playerIDs.slice(
                          index + 1,
                          formState.playerIDs.length
                        )
                      ]
                    });
                  }}
                />
              )}
              {index === formState.playerIDs.length - 1 && (
                <AddIcon
                  cursor="pointer"
                  onClick={() =>
                    dispatchForm({
                      type: "PLAYERS_CHANGE",
                      payload: [...formState.playerIDs, null]
                    })
                  }
                />
              )}
            </Flex>
          );
        })}

        <Button
          onClick={handleAddMatch}
          bgColor="#ff3f3f"
          _hover={{ bgColor: "#ff3f3f", opacity: "0.7" }}
        >
          Add Match
        </Button>
      </Flex>
    </Flex>
  );
};
