import prisma from "@/lib/prisma";

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
