export interface LeaderboardRowProps {
  breed: string;
  votes: number;
  id?: number;
  url: string;
  url_breed: string;
  rank: number;
}

interface LeaderboardProps {
  leaderboardList: LeaderboardRowProps[];
}

export function Leaderboard(props: LeaderboardProps): JSX.Element {
  return (
    <>
      {props.leaderboardList.map((dog, index) => (
        <LeaderboardRow
          key={dog.breed}
          breed={dog.breed}
          votes={dog.votes}
          url={dog.url}
          url_breed={dog.url_breed}
          rank={index}
        />
      ))}
    </>
  );
}

function LeaderboardRow(props: LeaderboardRowProps): JSX.Element {
  return (
    <tr>
      <td>{props.rank + 1}</td>
      <td>{props.breed}</td>
      <td>{props.votes}</td>
    </tr>
  );
}
