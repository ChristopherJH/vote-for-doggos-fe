export interface leaderboardrowprops {
  breed: string;
  votes: number;
  id?: number;
}

function LeaderboardRow(props: leaderboardrowprops): JSX.Element {
  return (
    <h3>
      {props.breed} - Votes: {props.votes}
    </h3>
  );
}

export default LeaderboardRow;
