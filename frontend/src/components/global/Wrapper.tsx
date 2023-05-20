import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { Home } from "../../pages/Home";
import { Clubs } from "../../pages/Clubs";
import { Players } from "../../pages/Players";
import { Matches } from "../../pages/Matches";
import { Goals } from "../../pages/Goals";
import { Navbar } from "./navbar/Navbar";
import { Error } from "../../pages/Error";
import { ClubDetails } from "../../pages/ClubDetails";
import { PlayerDetails } from "../../pages/PlayerDetails";
import { MatchDetails } from "../../pages/MatchDetails";
import { GoalDetails } from "../../pages/GoalDetails";

export const Wrapper = () => {
  const pages = [
    {
      path: "/",
      element: <Clubs />
    },
    {
      path: "/clubs",
      element: <Clubs />
    },
    {
      path: "/clubs/:id",
      element: <ClubDetails />
    },
    {
      path: "/players",
      element: <Players />
    },
    {
      path: "/players/:id",
      element: <PlayerDetails />
    },
    {
      path: "/matches",
      element: <Matches />
    },
    {
      path: "/matches/:id",
      element: <MatchDetails />
    },
    {
      path: "/goals",
      element: <Goals />
    },
    {
      path: "/goals/:id",
      element: <GoalDetails />
    }
  ].map((element, index) => ({ ...element, id: `${element.path}_${index}` }));

  return (
    <Flex flexWrap="wrap" direction="column">
      <BrowserRouter>
        <Flex mb="50px">
          <Navbar />
        </Flex>
        <Flex px="40px" py="56px">
          <Routes>
            {pages.map(({ path, element, id }) => (
              <Route path={path} element={element} key={id} />
            ))}
            <Route path="*" element={<Error />} key="*" />
          </Routes>
        </Flex>
      </BrowserRouter>
    </Flex>
  );
};
