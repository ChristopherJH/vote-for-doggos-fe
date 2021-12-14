import { DogProps } from "../App";

interface VotingSectionProps {
  dog1: DogProps;
  dog2: DogProps;
}
export function VotingSection(props: VotingSectionProps): JSX.Element {
  return (
    <div className="voting-section">
      <h3>{props.dog1.breed}</h3>
      <img src={props.dog1.url} alt="Dog 1" />
      <h3>{props.dog2.breed}</h3>
      <img src={props.dog2.url} alt="Dog 2" />
    </div>
  );
}
