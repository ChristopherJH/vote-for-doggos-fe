import LeaderboardRow from "./components/LeaderboardRow";
import { useEffect, useState } from "react";
import { LeaderboardRowProps } from "./components/LeaderboardRow";
import { VotingSection } from "./components/VotingSection";

export interface DogProps {
  url: string;
  breed: string;
  unformattedBreed: string;
}

function App(): JSX.Element {
  const [leaderboardList, setLeaderboardList] = useState<LeaderboardRowProps[]>(
    []
  );
  //const baseURL = "http://localhost:4000/";
  const baseURL = "https://vote-for-doggos.herokuapp.com/";

  useEffect(() => {
    getDataAndRerender(setLeaderboardList, baseURL);
  }, []);

  return (
    <>
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
                {leaderboardList.map((dog) => (
                  <LeaderboardRow
                    key={dog.breed}
                    breed={dog.breed}
                    votes={dog.votes}
                    url={dog.url}
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

interface TopDogsProps {
  leaderboardList: LeaderboardRowProps[];
}

function TopDogs(props: TopDogsProps): JSX.Element {
  return (
    <>
      <h2>Top dogs</h2>
      {props.leaderboardList.slice(0, 3).map((topdog) => (
        <TopDog key={topdog.breed} dog={topdog} />
      ))}
    </>
  );
}

interface TopDogProps {
  dog: LeaderboardRowProps;
}

function TopDog(props: TopDogProps): JSX.Element {
  const { dog } = props;
  return <h3>{dog.breed}</h3>;
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
