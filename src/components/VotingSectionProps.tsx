import axios from "axios";
import { useEffect, useState } from "react";
import { DogProps } from "../App";

// interface VotingSectionProps {
// }

export function VotingSection(): JSX.Element {
  const [dog1, setDog1] = useState<DogProps>({
    url: "",
    breedName: "",
  });
  const [dog2, setDog2] = useState<DogProps>({
    url: "",
    breedName: "",
  });
  useEffect(() => {
    getNewDogs(setDog1, setDog2);
  }, []);

  return (
    <div className="voting-section">
      <h3>{dog1.breedName}</h3>
      <img src={dog1.url} alt="Dog 1" />
      <VoteButton
        breedName={dog1.breedName}
        setDog1={setDog1}
        setDog2={setDog2}
      />
      <h3>{dog2.breedName}</h3>
      <img src={dog2.url} alt="Dog 2" />
      <VoteButton
        breedName={dog2.breedName}
        setDog1={setDog1}
        setDog2={setDog2}
      />
    </div>
  );
}

async function handleVote(
  breedName: string,
  setDog1: (input: DogProps) => void,
  setDog2: (input: DogProps) => void
) {
  const res = await axios.put("http://localhost:4000/dogs/addvote", {
    breed: breedName,
  });
  console.log(res);
  getNewDogs(setDog1, setDog2);
}

interface VoteButtonProps {
  breedName: string;
  setDog1: (input: DogProps) => void;
  setDog2: (input: DogProps) => void;
}

function VoteButton(props: VoteButtonProps): JSX.Element {
  return (
    <button
      onClick={() => handleVote(props.breedName, props.setDog1, props.setDog2)}
    >
      Vote
    </button>
  );
}

function getNewDogs(
  setDog1: (input: DogProps) => void,
  setDog2: (input: DogProps) => void
) {
  function getRandomDog(setDog: (input: DogProps) => void) {
    const res = fetch("http://localhost:4000/dogs/random")
      .then((response) => response.json())
      .then((dog) => setDog(dog));
    return res;
  }
  getRandomDog(setDog1);
  getRandomDog(setDog2);
}
