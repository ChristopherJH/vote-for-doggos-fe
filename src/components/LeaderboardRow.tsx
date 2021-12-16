export interface LeaderboardRowProps {
  breed: string;
  votes: number;
  id?: number;
  index: number;
}

function LeaderboardRow(props: LeaderboardRowProps): JSX.Element {
  return (
    <tr>
      <td>
        {props.index} {props.index === 1 && "🥇"} {props.index === 2 && "🥈"}{" "}
        {props.index === 3 && "🥉"}
      </td>
      <td>{props.breed}</td>
      <td>{props.votes}</td>
    </tr>
  );
}

export default LeaderboardRow;
