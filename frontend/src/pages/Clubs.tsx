import { Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { addClubReducer } from "../reducers/addClubReducer";
import { Club } from "../types/Clubs";

export const Clubs = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [formState, dispatchForm] = useReducer(addClubReducer, {
    name: "",
    country: "",
    foundationDate: "",
    trainer: ""
  });

  // const clubsTest = [
  //   { name: "Klub 1", id: 1, foundationDate: "2023-05-04", country: "Poland" }
  // ];

  const getClubs = async () => {
    const res = await axios.get("http://localhost:8080/take/Clubs");
    console.log(res.data.clubs);
    setClubs(res.data.clubs);
  };

  useEffect(() => {
    getClubs();
  }, []);

  const handleAddClub = async () => {
    if (
      formState.name !== "" &&
      formState.country !== "" &&
      formState.foundationDate !== "" &&
      formState.trainer !== ""
    ) {
      console.log("data", JSON.stringify(formState));
      const res = await axios({
        method: "post",
        url: "http://localhost:8080/take/Clubs",
        data: JSON.stringify(formState),
        headers: {
          "Content-Type": "application/json"
        }
      });
      getClubs();
    }
  };

  return (
    <Flex justify="space-between" w="100%" gap="32px">
      <Flex flexDir="column" gap="16px" w="50%">
        <Text fontSize="24px" fontWeight="600" mb="16px">
          Clubs list
        </Text>
        {clubs?.map((club: any, index: number) => {
          return (
            <Link
              href={`/clubs/${club.id}`}
              padding="12px"
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
                {club.name}
              </Text>
              <Flex gap="8px" align="center" fontSize="12px">
                <Text>{club.foundationDate}</Text>
                <Text>{club.country}</Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
      <Flex flexDir="column" gap="8px" w="50%">
        <Input
          placeholder="Name"
          onChange={(e: any) =>
            dispatchForm({ type: "NAME_CHANGE", payload: e.target.value })
          }
        />
        <Input
          placeholder="Country"
          onChange={(e: any) =>
            dispatchForm({ type: "COUNTRY_CHANGE", payload: e.target.value })
          }
        />
        <Input
          placeholder="Foundation Date"
          onChange={(e: any) =>
            dispatchForm({ type: "DATE_CHANGE", payload: e.target.value })
          }
          type="date"
        />
        <Input
          placeholder="Trainer"
          onChange={(e: any) =>
            dispatchForm({ type: "TRAINER_CHANGE", payload: e.target.value })
          }
        />
        <Button
          onClick={handleAddClub}
          bgColor="#ff3f3f"
          _hover={{ bgColor: "#ff3f3f", opacity: "0.7" }}
        >
          Add Club
        </Button>
      </Flex>
    </Flex>
  );
};
