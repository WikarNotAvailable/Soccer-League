import { Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useEffect, useReducer, useState } from "react";
import { addPlayerReducer } from "../reducers/addPlayerReducer";
import { Club } from "../types/Clubs";
import { Player } from "../types/Players";

export const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [options, setOptions] = useState<any>();
  const [formState, dispatchForm] = useReducer(addPlayerReducer, {
    firstName: "",
    surname: "",
    dateOfBirth: "",
    nationality: "",
    position: "",
    clubID: null
  });

  const getPlayers = async () => {
    const res = await axios.get("http://localhost:8080/take/Players");
    setPlayers(res.data.players);
  };

  const getClubs = async () => {
    const res = await axios.get("http://localhost:8080/take/Clubs");
    setClubs(res.data.clubs);
    let arr: any[] = [];
    res.data.clubs.forEach((club: Club) =>
      arr.push({ label: club.name, value: club.id })
    );
    setOptions(arr);
  };

  useEffect(() => {
    getPlayers();
    getClubs();
  }, []);

  const handleAddPlayer = async () => {
    if (
      formState.firstName !== "" &&
      formState.surname !== "" &&
      formState.dateOfBirth !== "" &&
      formState.nationality !== "" &&
      formState.position !== "" &&
      formState.clubID !== null
    ) {
      const data = { ...formState };
      delete data.clubID;
      console.log("data", JSON.stringify(data));
      const res = await axios({
        method: "post",
        url: `http://localhost:8080/take/Players?clubID=${formState.clubID}`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res);
      getPlayers();
    }
  };

  return (
    <Flex justify="space-between" w="100%" gap="32px">
      <Flex flexDir="column" gap="16px" w="50%">
        <Text fontSize="24px" fontWeight="600" mb="16px">
          Players list
        </Text>
        {players?.map((player: Player, index: number) => {
          return (
            <Link
              href={`/players/${player.id}`}
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
                {player.firstName}&nbsp;{player.surname}
              </Text>
              <Flex gap="8px" align="center" fontSize="12px">
                <Text>{player.dateOfBirth}</Text>
                <Text>{player.nationality}</Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
      <Flex flexDir="column" gap="8px" w="50%">
        <Input
          placeholder="First Name"
          onChange={(e: any) =>
            dispatchForm({ type: "FIRSTNAME_CHANGE", payload: e.target.value })
          }
        />
        <Input
          placeholder="Surname"
          onChange={(e: any) =>
            dispatchForm({ type: "SURNAME_CHANGE", payload: e.target.value })
          }
        />
        <Input
          placeholder="Date of birth"
          onChange={(e: any) =>
            dispatchForm({ type: "DATE_CHANGE", payload: e.target.value })
          }
          type="date"
        />
        <Input
          placeholder="Nationality"
          onChange={(e: any) =>
            dispatchForm({
              type: "NATIONALITY_CHANGE",
              payload: e.target.value
            })
          }
        />
        <Input
          placeholder="Position"
          onChange={(e: any) =>
            dispatchForm({
              type: "POSITION_CHANGE",
              payload: e.target.value
            })
          }
        />
        <Select
          placeholder="Select club"
          options={options}
          onChange={(e: any) =>
            dispatchForm({
              type: "CLUB_CHANGE",
              payload: e.value
            })
          }
        />
        <Button
          onClick={handleAddPlayer}
          bgColor="#ff3f3f"
          _hover={{ bgColor: "#ff3f3f", opacity: "0.7" }}
        >
          Add Player
        </Button>
      </Flex>
    </Flex>
  );
};
