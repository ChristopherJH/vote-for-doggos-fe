import LeaderboardRow from "./components/LeaderboardRow";
import { useEffect, useState } from "react";
import { leaderboardrowprops } from "./components/LeaderboardRow";

function App(): JSX.Element {
  const [LeaderboardList, setLeaderboardList] = useState<leaderboardrowprops[]>(
    []
  );
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <h1>Vote for doggos</h1>
      <h2>Leaderboard</h2>
      <button onClick={handleRefresh}>Refresh leaderboard</button>
      <div>
        {LeaderboardList.map((row) => (
          <LeaderboardRow key={row.breed} breed={row.breed} votes={row.votes} />
        ))}
      </div>
    </>
  );
}

export default App;
