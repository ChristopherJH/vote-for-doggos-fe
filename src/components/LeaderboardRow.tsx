export interface LeaderboardRowProps {
  breed: string;
  votes: number;
  id?: number;
  url: string;
  url_breed: string;
}

function LeaderboardRow(props: LeaderboardRowProps): JSX.Element {
  return (
    <tr>
      <td>Rank</td>
      <td>{props.breed}</td>
      <td>{props.votes}</td>
    </tr>
  );
}

export default LeaderboardRow;
