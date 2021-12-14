import LeaderboardRow from "./components/LeaderboardRow";
import { useEffect, useState } from "react";
import { LeaderboardRowProps } from "./components/LeaderboardRow";
import { VotingSection } from "./components/VotingSectionProps";
import { getRandomDog } from "./utils/getRandomDog";

export interface DogProps {
  url: string;
  breed: string;
}

function App(): JSX.Element {
  const [LeaderboardList, setLeaderboardList] = useState<LeaderboardRowProps[]>(
    []
  );
  const [dog1, setDog1] = useState<DogProps>({
    url: "",
    breed: "",
  });
  const [dog2, setDog2] = useState<DogProps>({
    url: "",
    breed: "",
  });

  useEffect(() => {
    getRandomDog(setDog1);
    getRandomDog(setDog2);
  }, []);
  console.log(dog1);

  function getDataAndRerender() {
    fetch("http://localhost:4000/leaderboard")
      .then((response) => response.json())
      .then((jsonBody) => {
        const fetchedData = jsonBody.data;
        setLeaderboardList(fetchedData);
      });
  }

  useEffect(() => {
    getDataAndRerender();
  }, []);

  return (
    <>
      <h1>Vote for doggos</h1>
      <VotingSection dog1={dog1} dog2={dog2} />
      <h2>Leaderboard</h2>
      <button onClick={getDataAndRerender}>Refresh leaderboard</button>
      <div>
        {LeaderboardList.map((row) => (
          <LeaderboardRow key={row.breed} breed={row.breed} votes={row.votes} />
        ))}
      </div>
    </>
  );
}

export default App;
