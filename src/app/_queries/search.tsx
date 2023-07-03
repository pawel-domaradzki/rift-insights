import axios from "axios";

export function getSummoner(summonerName: string) {
  return axios
    .get(`http://localhost:3000/api/summoner/EUN1/${summonerName}`)
    .then((res) => res.data);
}

export function getMatchesSummary(puuid: string) {
  return axios
    .get(`http://localhost:3000/api/${puuid}/matchesSummary`)
    .then((res) => res.data);
}

export async function storeMatchHistoryForSummoner(puuid:string) {
  try {
      const matchHistoryResponse = await axios.get(`http://localhost:3000/api/${puuid}/matchHistory`);
      console.log("Match history stored successfully", matchHistoryResponse.data);
  } catch (error) {
      console.error("Error calling match history endpoint", error);
  }
}
