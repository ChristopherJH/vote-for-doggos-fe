export interface LeaderboardRowProps {
  breed: string;
  votes: number;
  id?: number;
  url: string;
}

function LeaderboardRow(props: LeaderboardRowProps): JSX.Element {
  return (
    <h3>
      {props.breed} - Votes: {props.votes}
    </h3>
  );
}

export default LeaderboardRow;
