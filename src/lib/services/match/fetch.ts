// matchService.ts
import axios from "axios";

export async function fetchMatchDetails(matchId: string) {
  const apiKey = process.env.RIOT_API_KEY;

  try {
    const { data } = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`
    );

    const gameMode = data.info.gameMode;
    const participants = data.info.participants.map((participant: any) => ({
      puuid: participant.puuid,
      summonerName: participant.summonerName,
    }));

    return {
      matchId,
      gameMode,
      participants,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
