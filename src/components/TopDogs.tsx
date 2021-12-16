import { useEffect, useState } from "react";
import { formatNameToURL } from "../utils/formatNameToURL";
import { LeaderboardRowProps } from "./Leaderboard";

interface TopDogsProps {
  leaderboardList: LeaderboardRowProps[];
}
export function TopDogs(props: TopDogsProps): JSX.Element {
  console.log("leaderboard list:", props.leaderboardList);
  return (
    <div className="top-dogs">
      <h2 className="text-center">Top dogs 🏆</h2>
      <table className="table">
        <tbody>
          <tr>
            <td className="text-center">
              <h2>🥇</h2>
            </td>
            <td className="text-center">
              <h2>🥈</h2>
            </td>
            <td className="text-center">
              <h2>🥉</h2>
            </td>
          </tr>
          <tr>
            {props.leaderboardList.length > 0 &&
              props.leaderboardList
                .slice(0, 3)
                .map((topdog) => <TopDog key={topdog.breed} dog={topdog} />)}
          </tr>
        </tbody>
      </table>
      <br />
    </div>
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
  const [img, setImg] = useState("");
  const urlBreed = formatNameToURL(dog.url_breed);
  useEffect(() => {
    getImgUrl(urlBreed, setImg);
  }, [urlBreed]);

  return (
    <td className="text-center">
      <h3>{dog.breed}</h3>
      <img
        src={img}
        alt={dog.breed}
        className="top-dog-img"
        onClick={() => getImgUrl(urlBreed, setImg)}
      />
    </td>
  );
}

async function getImgUrl(urlBreed: string, setImg: (input: string) => void) {
  const response = await fetch(
    `https://dog.ceo/api/breed/${urlBreed}/images/random`
  );
  const jsonBody: DogImageProps = await response.json();
  setImg(jsonBody.message);
}
