import { useEffect, useState } from "react";
import { formatNameToURL } from "../utils/formatNameToURL";
import { LeaderboardRowProps } from "./Leaderboard";

interface TopDogsProps {
  leaderboardList: LeaderboardRowProps[];
}
export function TopDogs(props: TopDogsProps): JSX.Element {
  console.log("leaderboard list:", props.leaderboardList);
  return (
    <>
      <h2>Top dogs</h2>
      {props.leaderboardList.length > 0 &&
        props.leaderboardList
          .slice(0, 3)
          .map((topdog) => <TopDog key={topdog.breed} dog={topdog} />)}
    </>
  );
}
interface TopDogProps {
  dog: LeaderboardRowProps;
}
interface DogImageProps {
  message: string;
  status: string;
}
function TopDog(props: TopDogProps): JSX.Element {
  const { dog } = props;
  console.log("top dog unformatted:", dog.url_breed);
  const [img, setImg] = useState("");
  const urlBreed = formatNameToURL(dog.url_breed);
  console.log(urlBreed);
  useEffect(() => {
    getImgUrl(urlBreed, setImg);
  }, [urlBreed]);

  return (
    <>
      <h3>{dog.breed}</h3>
      <img
        src={img}
        alt={dog.breed}
        onClick={() => getImgUrl(urlBreed, setImg)}
      />
    </>
  );
}

async function getImgUrl(urlBreed: string, setImg: (input: string) => void) {
  const response = await fetch(
    `https://dog.ceo/api/breed/${urlBreed}/images/random`
  );
  const jsonBody: DogImageProps = await response.json();
  setImg(jsonBody.message);
}
