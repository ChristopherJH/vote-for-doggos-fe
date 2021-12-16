import LeaderboardRow from "./components/LeaderboardRow";
import { useEffect, useState } from "react";
import { LeaderboardRowProps } from "./components/LeaderboardRow";
import { VotingSection } from "./components/VotingSection";
import "./App.css";

export interface DogProps {
  url: string;
  breed: string;
}

function App(): JSX.Element {
  const [LeaderboardList, setLeaderboardList] = useState<LeaderboardRowProps[]>(
    []
  );
  const baseURL = "https://vote-for-doggos.herokuapp.com/";

  useEffect(() => {
    getDataAndRerender(setLeaderboardList, baseURL);
  }, []);

  console.log(LeaderboardList);
  return (
    <>
      <nav className="navbar navbar-dark bg-light">Vote for doggos</nav>
      <table className="table">
        <tbody>
          <VotingSection baseURL={baseURL} />
        </tbody>
      </table>
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <div className="d-flex w-100 justify-content-between">
              <h2>Leaderboard</h2>
              <button
                className="btn btn-primary"
                onClick={() => getDataAndRerender(setLeaderboardList, baseURL)}
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
                {LeaderboardList.map((row) => (
                  <LeaderboardRow
                    key={row.breed}
                    breed={row.breed}
                    votes={row.votes}
                    index={LeaderboardList.indexOf(row) + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
}

export default App;

function getDataAndRerender(
  setLeaderboardList: (input: LeaderboardRowProps[]) => void,
  baseURL: string
) {
  fetch(baseURL + "leaderboard")
    .then((response) => response.json())
    .then((jsonBody) => {
      const fetchedData = jsonBody.data;
      setLeaderboardList(fetchedData);
    });
}
