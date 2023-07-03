import axios from 'axios';

export const getRiotSummoner = async (region: string, summonerName: string) => {
  const apiKey = process.env.RIOT_API_KEY;
  const { data } = await axios.get(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
  );
  return data;
};
