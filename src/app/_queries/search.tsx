import axios from "axios";

export function getSummoner(summonerName: string) {
  return axios
    .get(`http://localhost:3000/api/summoner/EUN1/${summonerName}`)
    .then((res) => res.data);
}
