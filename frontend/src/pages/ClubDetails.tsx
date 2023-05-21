import { Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { addClubReducer } from "../reducers/addClubReducer";
import { Club } from "../types/Clubs";

export const ClubDetails = () => {
  const [club, setClub] = useState<Club>();
  const params = useParams();
  const navigate = useNavigate();
  const [formState, dispatchForm] = useReducer(addClubReducer, {
    name: club?.name ?? "",
    country: club?.country ?? "",
    foundationDate: club?.foundationDate ?? "",
    trainer: club?.trainer ?? ""
  });

  const getClub = async () => {
    const res = await axios.get(
      `http://localhost:8080/take/Clubs/${params.id}`
    );
    console.log(res.data);
    setClub(res.data);
    dispatchForm({ type: "NAME_CHANGE", payload: res.data.name });
    dispatchForm({ type: "COUNTRY_CHANGE", payload: res.data.country });
    dispatchForm({ type: "DATE_CHANGE", payload: res.data.foundationDate });
    dispatchForm({ type: "TRAINER_CHANGE", payload: res.data.trainer });
  };

  useEffect(() => {
    getClub();
  }, []);

  const handleEditClub = async () => {
    const data = { ...formState, id: params.id };
    const res = await axios({
      method: "PUT",
      url: `http://localhost:8080/take/Clubs`,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  const handleDeleteClub = async () => {
    const res = await axios.delete(
      `http://localhost:8080/take/Clubs/${params.id}`
    );
    if (res.data === "Club deleted") {
      navigate("/clubs");
    }
  };

  return (
    <Flex justify="space-between" w="100%" gap="32px">
      <Flex flexDir="column" gap="16px" w="50%">
        <Text fontSize="24px" fontWeight="600" mb="16px">
          Clubs details
        </Text>
        <Flex flexDir="column" gap="8px">
          <Text fontWeight="700">
            Club name:&nbsp;<Text fontWeight="400">{club?.name}</Text>
          </Text>
          <Text fontWeight="700">
            Country:&nbsp;<Text fontWeight="400">{club?.country}</Text>
          </Text>
          <Text fontWeight="700">
            Foundation date:&nbsp;
            <Text fontWeight="400">{club?.foundationDate}</Text>
          </Text>
          <Text fontWeight="700">
            Trainer:&nbsp;<Text fontWeight="400">{club?.trainer}</Text>
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="8px" w="50%">
        <Input
          placeholder="Name"
          value={club?.name}
          onChange={(e: any) =>
            dispatchForm({ type: "NAME_CHANGE", payload: e.target.value })
          }
        />
        <Input
          placeholder="Country"
          value={club?.country}
          onChange={(e: any) =>
            dispatchForm({ type: "COUNTRY_CHANGE", payload: e.target.value })
          }
        />
        <Input
          placeholder="Foundation Date"
          value={club?.foundationDate}
          onChange={(e: any) =>
            dispatchForm({ type: "DATE_CHANGE", payload: e.target.value })
          }
          type="date"
        />
        <Input
          placeholder="Trainer"
          value={club?.trainer}
          onChange={(e: any) =>
            dispatchForm({ type: "TRAINER_CHANGE", payload: e.target.value })
          }
        />
        <Button
          onClick={handleEditClub}
          bgColor="#ff3f3f"
          _hover={{ bgColor: "#ff3f3f", opacity: "0.7" }}
        >
          Edit Club
        </Button>
        <Button
          onClick={handleDeleteClub}
          bgColor="transparent"
          border="1px solid #ff3f3f"
          _hover={{ opacity: "0.7" }}
        >
          Delete Club
        </Button>
      </Flex>
    </Flex>
  );
};
