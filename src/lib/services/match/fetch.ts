// matchService.ts
import axios from "axios";

interface ParticipantMatchStats {
  puuid: string;
  summonerName: string;
  assists: number;
  kills: number;
  championId: number;
  totalDamageDealtToChampions: number;
  totalMinionsKilled: number;
  deaths: number;
  goldEarned: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  wardsPlaced: number;
}

export async function fetchMatchDetails(matchId: string) {
  const apiKey = process.env.RIOT_API_KEY;

  try {
    const { data } = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`
    );

    const gameMode = data.info.gameMode;
    const gameCreation = data.info.gameCreation;
    const participants = data.info.participants.map(
      ({
        puuid,
        summonerName,
        assists,
        kills,
        championId,
        totalDamageDealtToChampions,
        totalMinionsKilled,
        deaths,
        goldEarned,
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        wardsPlaced,
      }: ParticipantMatchStats) => ({
        puuid,
        summonerName,
        kills,
        assists,
        deaths,
        championId,
        totalDamageDealtToChampions,
        totalMinionsKilled,
        goldEarned,
        wardsPlaced,
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
      })
    );

    return {
      matchId,
      gameMode,
      gameCreation,
      participants,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
