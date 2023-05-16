import { Button, Flex, Input, Text } from "@chakra-ui/react";
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
          Accept: "/",
          "Accept-Encoding": "gzip,deflate,br",
          Connection: "keep-alive",
          "Content-Type": "application/json",
          "User-Agent": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        },
        maxContentLength: 100000000,
        maxBodyLength: 1000000000,
        timeout: 1000000000
      });
      console.log(res);
      getClubs();
    }
  };

  return (
    <Flex justify="space-between" w="100%" gap="32px">
      <Flex flexDir="column" gap="16px" w="50%">
        <Text fontSize="24px" fontWeight="600" mb="16px">
          Clubs list
        </Text>
        {clubs?.map((club: Club, index: number) => {
          return (
            <Flex
              p="8px"
              gap="8px"
              w="100%"
              justify="space-between"
              align="center"
              key={index}
            >
              <Text fontSize="14px" fontWeight="600">
                {club.name}
              </Text>
              <Flex gap="8px" align="center" fontSize="12px">
                <Text>{club.foundationDate}</Text>
                <Text>{club.country}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Flex flexDir="column" gap="8px" w="50%">
        {formState.name}
        <Input
          placeholder="Name"
          onChange={(e: any) =>
            dispatchForm({ type: "NAME_CHANGE", payload: e.target.value })
          }
        />
        {formState.country}
        <Input
          placeholder="Country"
          onChange={(e: any) =>
            dispatchForm({ type: "COUNTRY_CHANGE", payload: e.target.value })
          }
        />
        {formState.foundationDate}
        <Input
          placeholder="Foundation Date"
          onChange={(e: any) =>
            dispatchForm({ type: "DATE_CHANGE", payload: e.target.value })
          }
          type="date"
        />
        {formState.trainer}
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
