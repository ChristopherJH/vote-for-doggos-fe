import { Leaderboard } from "./components/Leaderboard";
import { useEffect, useState } from "react";
import { LeaderboardRowProps } from "./components/Leaderboard";
import { VotingSection } from "./components/VotingSection";
import { TopDogs } from "./components/TopDogs";
import { getDogData } from "./utils/getDogData";

export interface DogProps {
  url: string;
  breed: string;
  url_breed: string;
}

function App(): JSX.Element {
  const [leaderboardList, setLeaderboardList] = useState<LeaderboardRowProps[]>(
    []
  );
  //const baseURL = "http://localhost:4000/";
  const baseURL = "https://vote-for-doggos.herokuapp.com/";

  useEffect(() => {
    getDogData(setLeaderboardList, baseURL);
  }, []);

  return (
    <div className="main">
      <h1>Vote for doggos</h1>
      <table className="table">
        <tbody>
          <VotingSection baseURL={baseURL} />
        </tbody>
      </table>
      <div className="container">
        <TopDogs leaderboardList={leaderboardList} />
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <div className="d-flex w-100 justify-content-between">
              <h2>Leaderboard</h2>
              <button
                className="btn btn-primary"
                onClick={() => getDogData(setLeaderboardList, baseURL)}
              >
                🔄
              </button>
            </div>
            <br />
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Breed</th>
                  <th scope="col">Votes</th>
                </tr>
              </thead>
              <tbody>
                <Leaderboard leaderboardList={leaderboardList} />
              </tbody>
            </table>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
