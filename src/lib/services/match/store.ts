import prisma from "@/lib/prisma";
import { PlayerMatchStats } from "@prisma/client";

interface Match {
  gameId: string;
  gameMode: string;
  gameCreation: number;
  region: string;
}

export const storeMatches = async (matches: Match[]) => {
  return prisma.match.createMany({
    data: matches.map((match) => ({
      gameId: match.gameId,
      gameMode: match.gameMode,
      gameCreatedAt: match.gameCreation,
      region: match.region,
    })),
  });
};

interface MatchHistory {
  puuid: string;
  gameId: string;
  region: string;
}

export const storePlayerMatchesHistory = async (matches: MatchHistory[]) => {
  return prisma.playerMatchHistory.createMany({
    data: matches.map((match) => ({
      puuid: match.puuid,
      gameId: match.gameId,
      region: match.region,
    })),
  });
};

// export async function storeMatchHistory({
//   summonerId,
//   gameId,
//   region,
// }: MatchHistory) {
//   try {
//     const existingMatchHistory = await prisma.playerMatchHistory.findUnique({
//       where: {
//         summonerId_gameId: {
//           summonerId: summonerId,
//           gameId: gameId,
//         },
//       },
//     });

//     if (existingMatchHistory) {
//       return existingMatchHistory;
//     }

//     const matchHistory = await prisma.playerMatchHistory.create({
//       data: {
//         summonerId: summonerId,
//         gameId: gameId,
//         region: region,
//       },
//     });

//     return matchHistory;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

interface PlayerMatchStatsData extends Omit<PlayerMatchStats, "id"> {
  gameId: string;
  region: string;
}

export const storePlayerMatchesStats = async (
  playerMatchesStatsData: PlayerMatchStatsData[]
) => {
  return prisma.playerMatchStats.createMany({
    data: playerMatchesStatsData,
  });
};
