import axios from "axios";
import { useEffect, useState } from "react";
import { DogProps } from "../App";
import useSound from "use-sound";
import wuphf from "../audio/wuphf.mp3";
import { PlayOptions } from "use-sound/dist/types";

export interface VotingSectionProps {
  baseURL: string;
}

export function VotingSection(props: VotingSectionProps): JSX.Element {
  const [play] = useSound(wuphf);
  const [dog1, setDog1] = useState<DogProps>({
    url: "",
    breedName: "",
  });
  const [dog2, setDog2] = useState<DogProps>({
    url: "",
    breedName: "",
  });
  useEffect(() => {
    getNewDogs(setDog1, setDog2, props.baseURL);
  }, [props.baseURL]);

  return (
    <tr>
      <td className="text-center">
        <h3>{dog1.breedName}</h3>
        <img src={dog1.url} alt="Dog 1" width="auto" height="400px" />
        <div>
          <br />
          <VoteButton
            breedName={dog1.breedName}
            setDog1={setDog1}
            setDog2={setDog2}
            baseURL={props.baseURL}
            play={play}
          />
        </div>
      </td>
      <div className="col col-lg-2">
        <div className="text-middle">
          <h2>VS</h2>
        </div>
      </div>
      <td className="text-center">
        <h3>{dog2.breedName}</h3>
        <img src={dog2.url} alt="Dog 2" width="auto" height="400px" />
        <div>
          <br />
          <VoteButton
            breedName={dog2.breedName}
            setDog1={setDog1}
            setDog2={setDog2}
            baseURL={props.baseURL}
            play={play}
          />
        </div>
      </td>
    </tr>
  );
}

interface VoteButtonProps {
  breedName: string;
  setDog1: (input: DogProps) => void;
  setDog2: (input: DogProps) => void;
  baseURL: string;
  play: (options?: PlayOptions | undefined) => void;
}

function VoteButton(props: VoteButtonProps): JSX.Element {
  async function handleVote(
    breedName: string,
    setDog1: (input: DogProps) => void,
    setDog2: (input: DogProps) => void,
    baseURL: string
  ) {
    const res = await axios.put(baseURL + "dogs/addvote", {
      breed: breedName,
    });
    console.log(res);
    getNewDogs(setDog1, setDog2, baseURL);
    props.play();
  }
  return (
    <button
      className="btn btn-primary"
      onClick={() =>
        handleVote(props.breedName, props.setDog1, props.setDog2, props.baseURL)
      }
    >
      Vote
    </button>
  );
}

function getNewDogs(
  setDog1: (input: DogProps) => void,
  setDog2: (input: DogProps) => void,
  baseURL: string
) {
  function getRandomDog(setDog: (input: DogProps) => void) {
    const res = fetch(baseURL + "dogs/random")
      .then((response) => response.json())
      .then((dog) => setDog(dog));
    return res;
  }
  getRandomDog(setDog1);
  getRandomDog(setDog2);
}
