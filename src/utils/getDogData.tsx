import { LeaderboardRowProps } from "../components/Leaderboard";

export function getDogData(
  setLeaderboardList: (input: LeaderboardRowProps[]) => void,
  baseURL: string
): void {
  fetch(baseURL + "leaderboard")
    .then((response) => response.json())
    .then((jsonBody) => {
      const fetchedData = jsonBody.data;
      setLeaderboardList(fetchedData);
    });
}
