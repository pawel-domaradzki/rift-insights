import prisma from "@/lib/prisma";

interface PlayerMatchesHistory {
  puuid: string;
  gameId: string;
  region: string;
}

export const storePlayerMatchesHistory = async (
  matches: PlayerMatchesHistory[]
) => {
  return prisma.playerMatchHistory.createMany({
    data: matches.map((match) => ({
      puuid: match.puuid,
      gameId: match.gameId,
      region: match.region,
    })),
  });
};
