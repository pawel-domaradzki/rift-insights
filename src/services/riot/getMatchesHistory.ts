import axios from "axios";

export const getRiotMatchesHistory = async (puuid: string) => {
  const apiKey = process.env.RIOT_API_KEY;
  const { data } = await axios.get(
    `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
    {
      headers: { "X-Riot-Token": apiKey },
    }
  );
  return data;
};
