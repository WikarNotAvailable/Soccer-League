import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMatchReducer } from "../reducers/addMatchReducer";
import { Club } from "../types/Clubs";
import { Player } from "../types/Players";

export const MatchDetails = () => {
  const [match, setMatch] = useState<any>();
  const [homeClub, setHomeClub] = useState<Club>();
  const [awayClub, setAwayClub] = useState<Club>();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [clubsOptions, setClubsOptions] = useState<any>([]);
  const [playersOptions, setPlayersOptions] = useState<any>([]);
  const params = useParams();
  const navigate = useNavigate();
  const [formState, dispatchForm] = useReducer(addMatchReducer, {
    matchDate: match?.matchDate ?? "",
    score: match?.score ?? "",
    playerIDs: match?.playerIDs ?? [null],
    homeClubID: match?.homeClubID ?? null,
    awayClubID: match?.awayClubID ?? null
  });

  const getMatch = async () => {
    const res = await axios.get(
      `http://localhost:8080/take/Matches/${params.id}`
    );
    setMatch(res.data);
    const homeClub = await getClub(res.data.homeClubID);
    setHomeClub(homeClub);
    const awayClub = await getClub(res.data.awayClubID);
    setAwayClub(awayClub);
    dispatchForm({ type: "DATE_CHANGE", payload: res.data.matchDate });
    dispatchForm({ type: "SCORE_CHANGE", payload: res.data.score });
    dispatchForm({ type: "PLAYER_CHANGE", payload: res.data.playerIDs });
    dispatchForm({ type: "HOMECLUB_CHANGE", payload: res.data.homeClubID });
    dispatchForm({ type: "AWAYCLUB_CHANGE", payload: res.data.awayClubID });
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

  const getClub = async (id: number) => {
    const res = await axios.get(`http://localhost:8080/take/Clubs/${id}`);
    console.log(res.data);
    return res.data;
  };

  useEffect(() => {
    getMatch();
    getClubs();
    getPlayers();
  }, []);

  const handleEditMatch = async () => {
    if (
      formState.matchDate !== "" &&
      formState.score !== "" &&
      formState.homeClubID !== null &&
      formState.awayClubID !== null &&
      formState.playerIDs.find((id: number | null) => {
        return id === null;
      }) === undefined
    ) {
      const data = { ...formState, id: parseInt(params.id ?? "1") };
      delete data.homeClubID;
      delete data.awayClubID;
      const res = await axios({
        method: "put",
        url: `http://localhost:8080/take/Players?homeClubID=${formState.clubID}&awayClubID=${formState.awayClubID}`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      getMatch();
    }
  };

  const handleDeleteMatch = async () => {
    const res = await axios.delete(
      `http://localhost:8080/take/Matches/${params.id}`
    );
    if (res.data === "Match deleted") {
      navigate("/matches");
    }
  };

  return (
    <Flex justify="space-between" w="100%" gap="32px">
      <Flex flexDir="column" gap="16px" w="50%">
        <Text fontSize="24px" fontWeight="600" mb="16px">
          Match details
        </Text>
        <Flex flexDir="column" gap="8px">
          <Text fontWeight="700">
            Match date:&nbsp;<Text fontWeight="400">{match?.matchDate}</Text>
          </Text>
          <Text fontWeight="700">
            Score:&nbsp;<Text fontWeight="400">{match?.score}</Text>
          </Text>
          <Text fontWeight="700">
            Home club:&nbsp;<Text fontWeight="400">{homeClub?.name}</Text>
          </Text>
          <Text fontWeight="700">
            Away club:&nbsp;<Text fontWeight="400">{awayClub?.name}</Text>
          </Text>
          <Text fontWeight="700">
            Players:&nbsp;
            {match?.mplayers.map((player: Player) => (
              <Text fontWeight="400">
                {player?.firstName}&nbsp;{player?.surname}
              </Text>
            ))}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="8px" w="50%">
        <Input
          placeholder="Match date"
          value={formState?.matchDate}
          onChange={(e: any) =>
            dispatchForm({ type: "DATE_CHANGE", payload: e.target.value })
          }
          type="date"
        />
        <Input
          placeholder="Score"
          value={formState?.score}
          onChange={(e: any) =>
            dispatchForm({ type: "SCORE_CHANGE", payload: e.target.value })
          }
        />
        <Select
          placeholder="Select home club"
          value={formState?.homeClubID}
          options={clubsOptions}
          onChange={(e: any) =>
            dispatchForm({ type: "HOMECLUB_CHANGE", payload: e.value })
          }
        />
        <Select
          placeholder="Select away club"
          value={formState?.awayClubID}
          options={clubsOptions}
          onChange={(e: any) =>
            dispatchForm({ type: "AWAYCLUB_CHANGE", payload: e.value })
          }
        />
        {formState?.playerIDs.map((playerID: number, index: number) => {
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
                  value={playerID}
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
              {formState?.playerIDs.length > 1 && (
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
              {index === formState?.playerIDs.length - 1 && (
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
          onClick={handleEditMatch}
          bgColor="#ff3f3f"
          _hover={{ bgColor: "#ff3f3f", opacity: "0.7" }}
        >
          Edit Match
        </Button>
        <Button
          onClick={handleDeleteMatch}
          border="1px solid #ff3f3f"
          bgColor="transparent"
          _hover={{ opacity: "0.7" }}
        >
          Delete Match
        </Button>
      </Flex>
    </Flex>
  );
};
