import axios from "axios";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function getSummoner(summonerName: string, region: string) {
  return axios
    .get(`${API_BASE_URL}/summoner/${region}/${summonerName}`)
    .then((res) => res.data);
}

export function getMatchesSummary(puuid: string) {
  return axios
    .get(`${API_BASE_URL}/${puuid}/matchesSummary`)
    .then((res) => res.data);
}

export async function storeMatchHistoryForSummoner(puuid: string) {
  try {
    const matchHistoryResponse = await axios.get(
      `http://localhost:3000/api/${puuid}/matchHistory`
    );
    console.log("Match history stored successfully", matchHistoryResponse.data);
  } catch (error) {
    console.error("Error calling match history endpoint", error);
  }
}
