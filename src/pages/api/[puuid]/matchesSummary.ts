import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

import {
  getPlayerMatchesStats,
  storeMatches,
  storePlayerMatchesHistory,
  storePlayerMatchesStats,
} from "@/services/db";
import {
  GameInfoAndPlayerMatchStats,
  getRiotMatchDetails,
} from "@/services/riot/getMatchDetails";
import { getRiotMatchesHistory } from "@/services/riot/getMatchesHistory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const puuid = req.query.puuid as string;

      const summoner = await prisma.summoner.findUnique({
        where: {
          puuid: puuid,
        },
      });

      if (!summoner) {
        return res.status(404).json({ error: "Summoner not found" });
      }

      const historyMatches = await getRiotMatchesHistory(puuid);

      const matchDetailPromises = historyMatches.map((matchId: string) =>
        getRiotMatchDetails(matchId)
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
              ...playerMatchStats,
              gameId: matchDetails.gameId,
              region: summoner.region,
            })
          );

          allPlayerMatchStats.push(...playerMatchStatsData);
        }
      }

      let status = {
        needToBeStored: {
          match: !!allMatches.length,
          playerMatchesHistory: !!playerMatchHistory.length,
          playerMatchStats: !!allPlayerMatchStats.length,
        },
        stored: {
          match: false,
          playerMatchesHistory: false,
          playerMatchStats: false,
        },
      };

      if (allMatches.length) {
        await storeMatches(allMatches);
        status.stored.match = true;
      }

      if (playerMatchHistory.length) {
        await storePlayerMatchesHistory(playerMatchHistory);
        status.stored.playerMatchesHistory = true;
      }

      if (allPlayerMatchStats.length) {
        await storePlayerMatchesStats(allPlayerMatchStats);
        status.stored.playerMatchStats = true;
      }

      const isSuccess = Object.keys(status.needToBeStored).every(
        (key) =>
          status.needToBeStored[key as keyof typeof status.needToBeStored] ===
          status.stored[key as keyof typeof status.stored]
      );

      if (isSuccess) {
        const playerStats = await getPlayerMatchesStats(puuid);
        return res.status(200).json({ success: true, data: playerStats });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Failed to store matches" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error processing the request" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
