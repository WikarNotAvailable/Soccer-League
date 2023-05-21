import { Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPlayerReducer } from "../reducers/addPlayerReducer";
import { Club } from "../types/Clubs";

export const PlayerDetails = () => {
  const [player, setPlayer] = useState<any>();
  const [clubs, setClubs] = useState<Club[]>([]);
  const params = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState<any>();
  const [formState, dispatchForm] = useReducer(addPlayerReducer, {
    firstName: player?.firstName ?? "",
    surname: player?.surname ?? "",
    dateOfBirth: player?.dateOfBirth ?? "",
    nationality: player?.nationality ?? "",
    position: player?.position ?? "",
    clubID: player?.clubID ?? null
  });

  const getPlayer = async () => {
    const res = await axios.get(
      `http://localhost:8080/take/Players/${params.id}`
    );
    setPlayer(res.data);
    dispatchForm({ type: "FIRSTNAME_CHANGE", payload: res.data.firstName });
    dispatchForm({ type: "SURNAME_CHANGE", payload: res.data.surname });
    dispatchForm({ type: "DATE_CHANGE", payload: res.data.dateOfBirth });
    dispatchForm({ type: "NATIONALITY_CHANGE", payload: res.data.nationality });
    dispatchForm({ type: "POSITION_CHANGE", payload: res.data.position });
    dispatchForm({ type: "CLUB_CHANGE", payload: res.data.clubID });
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
    getPlayer();
    getClubs();
  }, []);

  const handleEditPlayer = async () => {
    if (
      formState.firstName !== "" &&
      formState.surname !== "" &&
      formState.dateOfBirth !== "" &&
      formState.nationality !== "" &&
      formState.position !== "" &&
      formState.clubID !== null
    ) {
      const data = { ...formState, id: params.id };
      delete data.clubID;
      console.log("data", JSON.stringify(data));
      const res = await axios({
        method: "put",
        url: `http://localhost:8080/take/Players?clubID=${formState.clubID}`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      getPlayer();
    }
  };

  const handleDeletePlayer = async () => {
    const res = await axios.delete(
      `http://localhost:8080/take/Players/${params.id}`
    );
    if (res.data === "Player deleted") {
      navigate("/players");
    }
  };

  return (
    <Flex justify="space-between" w="100%" gap="32px">
      <Flex flexDir="column" gap="16px" w="50%">
        <Text fontSize="24px" fontWeight="600" mb="16px">
          Player details
        </Text>
        <Flex flexDir="column" gap="8px">
          <Text fontWeight="700">
            First name:&nbsp;<Text fontWeight="400">{player?.firstName}</Text>
          </Text>
          <Text fontWeight="700">
            Surname:&nbsp;<Text fontWeight="400">{player?.surname}</Text>
          </Text>
          <Text fontWeight="700">
            Date of birth:&nbsp;
            <Text fontWeight="400">{player?.dateOfBirth}</Text>
          </Text>
          <Text fontWeight="700">
            Nationality:&nbsp;
            <Text fontWeight="400">{player?.nationality}</Text>
          </Text>
          <Text fontWeight="700">
            Position:&nbsp;
            <Text fontWeight="400">{player?.position}</Text>
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="8px" w="50%">
        <Input
          placeholder="First Name"
          value={formState.firstName}
          onChange={(e: any) =>
            dispatchForm({ type: "FIRSTNAME_CHANGE", payload: e.target.value })
          }
        />
        <Input
          placeholder="Surname"
          value={formState.surname}
          onChange={(e: any) =>
            dispatchForm({ type: "SURNAME_CHANGE", payload: e.target.value })
          }
        />
        <Input
          placeholder="Date of birth"
          value={formState.dateOfBirth}
          onChange={(e: any) =>
            dispatchForm({ type: "DATE_CHANGE", payload: e.target.value })
          }
          type="date"
        />
        <Input
          placeholder="Nationality"
          value={formState.nationality}
          onChange={(e: any) =>
            dispatchForm({
              type: "NATIONALITY_CHANGE",
              payload: e.target.value
            })
          }
        />
        <Input
          placeholder="Position"
          value={formState.position}
          onChange={(e: any) =>
            dispatchForm({
              type: "POSITION_CHANGE",
              payload: e.target.value
            })
          }
        />
        <Select
          placeholder="Select club"
          value={formState?.clubID}
          options={options}
          onChange={(e: any) =>
            dispatchForm({
              type: "CLUB_CHANGE",
              payload: e.value
            })
          }
        />
        <Button
          onClick={handleEditPlayer}
          bgColor="#ff3f3f"
          _hover={{ bgColor: "#ff3f3f", opacity: "0.7" }}
        >
          Edit Player
        </Button>
        <Button
          onClick={handleDeletePlayer}
          bgColor="transparent"
          border="1px solid #ff3f3f"
          _hover={{ opacity: "0.7" }}
        >
          Delete Player
        </Button>
      </Flex>
    </Flex>
  );
};
