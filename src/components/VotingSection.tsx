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
  const [voteCount, setVoteCount] = useState(0);
  const [play] = useSound(wuphf);
  const [dog1, setDog1] = useState<DogProps>({
    url: "",
    breed: "",
    url_breed: "",

  });
  const [dog2, setDog2] = useState<DogProps>({
    url: "",
    breed: "",
    url_breed: "",
  });
  useEffect(() => {
    getNewDogs(setDog1, setDog2, props.baseURL);
  }, [props.baseURL]);

  return (
    <tr>
      <td className="text-center">
        <h3>{dog1.breed}</h3>
        <img src={dog1.url} alt="Dog 1" width="400px" height="400px" />
        <div>
          <br />
          <VoteButton
            breed={dog1.breed}
            setDog1={setDog1}
            setDog2={setDog2}
            baseURL={props.baseURL}
            play={play}
            setVoteCount={setVoteCount}
          />
        </div>
      </td>
      <div className="col col-lg-15 middle">
        <h2 className="vs">VS</h2>
        <button type="button" className="btn btn-primary" disabled>
          User vote count:{" "}
          <span className="badge badge-light">{voteCount}</span>
        </button>
      </div>
      <td className="text-center">
        <h3>{dog2.breed}</h3>

        <img src={dog2.url} alt="Dog 2" width="400px" height="400px" />
        <div>
          <br />
          <VoteButton
            breed={dog2.breed}
            setDog1={setDog1}
            setDog2={setDog2}
            baseURL={props.baseURL}
            play={play}
            setVoteCount={setVoteCount}
          />
        </div>
      </td>
    </tr>
  );
}

interface VoteButtonProps {
  breed: string;
  setDog1: (input: DogProps) => void;
  setDog2: (input: DogProps) => void;
  baseURL: string;
  play: (options?: PlayOptions | undefined) => void;
  setVoteCount: React.Dispatch<React.SetStateAction<number>>;
}

function VoteButton(props: VoteButtonProps): JSX.Element {
  async function handleVote(
    breed: string,
    setDog1: (input: DogProps) => void,
    setDog2: (input: DogProps) => void,
    baseURL: string
  ) {
    const res = await axios.put(baseURL + "dogs/addvote", {
      breed: breed,
    });
    console.log(res);
    getNewDogs(setDog1, setDog2, baseURL);
    props.play();
    props.setVoteCount((prev) => prev + 1);
  }
  return (
    <button
      className="btn btn-primary"
      onClick={() =>
        handleVote(props.breed, props.setDog1, props.setDog2, props.baseURL)
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
    console.log(res);
    return res;
  }
  getRandomDog(setDog1);
  getRandomDog(setDog2);
}
