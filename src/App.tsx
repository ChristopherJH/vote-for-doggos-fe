import LeaderboardRow from "./components/LeaderboardRow";
import { useEffect, useState } from "react";
import { LeaderboardRowProps } from "./components/LeaderboardRow";
import { VotingSection } from "./components/VotingSection";

export interface DogProps {
  url: string;
  breed: string;
}

function App(): JSX.Element {
  const [leaderboardList, setLeaderboardList] = useState<LeaderboardRowProps[]>(
    []
  );
  const baseURL = "https://vote-for-doggos.herokuapp.com/";

  useEffect(() => {
    getDataAndRerender(setLeaderboardList, baseURL);
  }, []);

  return (
    <>
      <h1>Vote for doggos</h1>
      <VotingSection baseURL={baseURL} />
      <TopDogs leaderboardList={leaderboardList} />
      <h2>Leaderboard</h2>
      <button onClick={() => getDataAndRerender(setLeaderboardList, baseURL)}>
        Refresh leaderboard
      </button>
      <div>
        {leaderboardList.map((dog) => (
          <LeaderboardRow
            key={dog.breed}
            breed={dog.breed}
            votes={dog.votes}
            url={dog.url}
          />
        ))}
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
