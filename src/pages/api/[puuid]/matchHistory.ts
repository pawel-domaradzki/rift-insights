import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import axios from "axios";
import {
  GameInfoAndPlayerMatchStats,
  fetchMatchDetails,
} from "@/lib/services/match/fetch";
import {
  storeMatches,
  storePlayerMatchesHistory,
  storePlayerMatchesStats,
} from "@/lib/services/match/store";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const puuid = req.query.puuid as string;
    const apiKey = process.env.RIOT_API_KEY;

    const summoner = await prisma.summoner.findUnique({
      where: {
        puuid: puuid,
      },
    });

    if (!summoner) {
      return res.status(404).json({ error: "Summoner not found" });
    }

    try {
      const response = await axios.get(
        `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`,
        {
          headers: { "X-Riot-Token": apiKey },
        }
      );

      const matchIds = response.data;

      const matchDetailPromises = matchIds.map((matchId: string) =>
        fetchMatchDetails(matchId)
      );
      const allMatchDetails = await Promise.all(matchDetailPromises);

      const allMatches = [];
      const playerMatchHistory = [];
      const allPlayerMatchStats = [];
      const regionGameIdPairs = allMatchDetails.map((matchDetails) => ({
        gameId: matchDetails.gameId,
        region: summoner.region,
      }));

      const existingMatches = await prisma.match.findMany({
        where: {
          OR: regionGameIdPairs.map((pair) => ({
            gameId: pair.gameId,
            region: pair.region,
          })),
        },
      });

      const existingRegionGameIdPairs = existingMatches.map((match) => ({
        gameId: match.gameId,
        region: match.region,
      }));

      for (const matchDetails of allMatchDetails) {
        const regionGameIdPair = {
          gameId: matchDetails.gameId,
          region: summoner.region,
        };

        const exists = existingRegionGameIdPairs.some(
          (existingPair) =>
            existingPair.gameId === regionGameIdPair.gameId &&
            existingPair.region === regionGameIdPair.region
        );

        if (matchDetails && !exists) {
          allMatches.push({
            gameId: matchDetails.gameId,
            gameMode: matchDetails.gameMode,
            gameCreation: matchDetails.gameCreation,
            region: summoner.region,
          });

          playerMatchHistory.push({
            puuid: summoner.puuid,
            gameId: matchDetails.gameId,
            region: summoner.region,
          });

          const playerMatchStatsData = matchDetails.playersMatchStats.map(
            (playerMatchStats: GameInfoAndPlayerMatchStats) => ({
              region: summoner.region,
              ...playerMatchStats,
            })
          );

          allPlayerMatchStats.push(...playerMatchStatsData);
        }
      }

      if (allMatches.length) {
        await storeMatches(allMatches);
      }
      
      if (playerMatchHistory.length) {
        await storePlayerMatchesHistory(playerMatchHistory);
      }
      
      if (allPlayerMatchStats.length) {
        await storePlayerMatchesStats(allPlayerMatchStats);
      }
      
     
      res.status(200).json({data: "Success"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching match history" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
