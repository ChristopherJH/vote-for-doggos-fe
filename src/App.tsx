import LeaderboardRow from "./components/LeaderboardRow";
import { useEffect, useState } from "react";
import { LeaderboardRowProps } from "./components/LeaderboardRow";
import { VotingSection } from "./components/VotingSectionProps";

export interface DogProps {
  url: string;
  breedName: string;
}

function App(): JSX.Element {
  const [LeaderboardList, setLeaderboardList] = useState<LeaderboardRowProps[]>(
    []
  );

  useEffect(() => {
    getDataAndRerender(setLeaderboardList);
  }, []);

  console.log(LeaderboardList);
  return (
    <>
      <h1>Vote for doggos</h1>
      <VotingSection />
      <h2>Leaderboard</h2>
      <button onClick={() => getDataAndRerender(setLeaderboardList)}>
        Refresh leaderboard
      </button>
      <div>
        {LeaderboardList.map((row) => (
          <LeaderboardRow key={row.breed} breed={row.breed} votes={row.votes} />
        ))}
      </div>
    </>
  );
}

export default App;

function getDataAndRerender(
  setLeaderboardList: (input: LeaderboardRowProps[]) => void
) {
  fetch("http://localhost:4000/leaderboard")
    .then((response) => response.json())
    .then((jsonBody) => {
      const fetchedData = jsonBody.data;
      setLeaderboardList(fetchedData);
    });
}
