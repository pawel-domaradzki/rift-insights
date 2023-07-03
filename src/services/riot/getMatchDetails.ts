import axios from "axios";
import { extractGameId } from "@/shared/utils/extractGameId";

export interface PlayerMatchStats {
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

export interface GameInfoAndPlayerMatchStats {
  gameId: string;
  gameMode: string;
  gameCreation: number;
  playersMatchStats: PlayerMatchStats[];
}

export async function getRiotMatchDetails(
  matchId: string
): Promise<GameInfoAndPlayerMatchStats | null> {
  const apiKey = process.env.RIOT_API_KEY;

  try {
    const { data } = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`
    );
    const gameId = extractGameId(matchId)!;
    const gameMode = data.info.gameMode;
    const gameCreation = data.info.gameCreation;
    const playersMatchStats = data.info.participants.map(
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
      }: PlayerMatchStats) => ({
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
      gameId,
      gameMode,
      gameCreation,
      playersMatchStats,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
