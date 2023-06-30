import prisma from "@/lib/prisma";
import { PlayerMatchStats } from "@prisma/client";

interface Match {
  gameId: string;
  gameMode: string;
  region: string;
  gameCreation: number;
}

export async function storeMatch({
  gameId,
  gameMode,
  region,
  gameCreation,
}: Match) {
  try {
    const existingMatches = await prisma.match.findUnique({
      where: {
        region_gameId: {
          region: region,
          gameId: gameId,
        },
      },
    });

    if (existingMatches) {
      return existingMatches;
    }

    const matchDetails = await prisma.match.create({
      data: {
        gameId,
        gameMode,
        region,
        gameCreatedAt: gameCreation,
      },
    });

    return matchDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface MatchHistory {
  summonerId: string;
  gameId: string;
  region: string;
}

export async function storeMatchHistory({
  summonerId,
  gameId,
  region,
}: MatchHistory) {
  try {
    const existingMatchHistory = await prisma.playerMatchHistory.findUnique({
      where: {
        summonerId_gameId: {
          summonerId: summonerId,
          gameId: gameId,
        },
      },
    });

    if (existingMatchHistory) {
      return existingMatchHistory;
    }

    const matchHistory = await prisma.playerMatchHistory.create({
      data: {
        summonerId: summonerId,
        gameId: gameId,
        region: region,
      },
    });

    return matchHistory;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface PlayerMatchStatsData extends Omit<PlayerMatchStats, "id"> {
  gameId: string;
  region: string;
}

export async function storePlayerMatchStats(
  playerMatchStatsData: PlayerMatchStatsData
) {
  try {
    // Create a new PlayerMatchStats record
    const playerMatchStats = await prisma.playerMatchStats.create({
      data: playerMatchStatsData,
    });

    return playerMatchStats;
  } catch (error) {
    console.error(error);
    return null;
  }
}
