import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { addMatchReducer } from "../reducers/addMatchReducer";
import { Match } from "../types/Matches";

export const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
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

  useEffect(() => {
    getMatches();
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
                {match.matchDate}
              </Text>
              <Flex gap="8px" align="center" fontSize="12px">
                <Text>{match.score}</Text>
              </Flex>
            </Flex>
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
        <Input
          placeholder="Home club ID"
          onChange={(e: any) =>
            dispatchForm({ type: "HOMECLUB_CHANGE", payload: e.target.value })
          }
          type="number"
        />
        <Input
          placeholder="Away club ID"
          onChange={(e: any) =>
            dispatchForm({ type: "AWAYCLUB_CHANGE", payload: e.target.value })
          }
          type="number"
        />
        {formState.playerIDs.map((playerID: number, index: number) => {
          return (
            <Flex gap="8px" align="center" key={index}>
              <InputGroup>
                <Input
                  value={playerID}
                  placeholder="Player ID"
                  onChange={(e: any) =>
                    dispatchForm({
                      type: "PLAYERS_CHANGE",
                      payload: [
                        ...formState.playerIDs.slice(0, index),
                        +e.target.value,
                        ...formState.playerIDs.slice(index + 1)
                      ]
                    })
                  }
                  type="number"
                />
                {formState.playerIDs.length > 1 && (
                  <InputRightElement>
                    <DeleteIcon
                      onClick={() => {
                        console.log("index", index);
                        console.log([
                          ...formState.playerIDs.slice(0, index),
                          ...formState.playerIDs.slice(
                            index + 1,
                            formState.playerIDs.length
                          )
                        ]);
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
                  </InputRightElement>
                )}
              </InputGroup>
              {index === formState.playerIDs.length - 1 && (
                <AddIcon
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
