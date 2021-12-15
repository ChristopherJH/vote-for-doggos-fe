import { DogProps } from "../App";

interface VotingSectionProps {
  dog1: DogProps;
  dog2: DogProps;
}

export function VotingSection(props: VotingSectionProps): JSX.Element {
  return (
    <div className="voting-section">
      <h3>{props.dog1.breedName}</h3>
      <img src={props.dog1.url} alt="Dog 1" />
      <VoteButton breedName={props.dog1.breedName} />
      <h3>{props.dog2.breedName}</h3>
      <img src={props.dog2.url} alt="Dog 2" />
      <VoteButton breedName={props.dog2.breedName} />
    </div>
  );
}

async function handleVote(breedName: string) {
  console.log(JSON.stringify("Golden retriever"));
  await fetch("http://localhost:4000/dogs/addvote", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify("Golden retriever"),
  });
  console.log("Vote registered!");
}

interface VoteButtonProps {
  breedName: string;
}

function VoteButton(props: VoteButtonProps): JSX.Element {
  return <button onClick={() => handleVote(props.breedName)}>Vote</button>;
}
