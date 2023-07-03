import prisma from "@/lib/prisma";
import { PlayerMatchStats } from "@prisma/client";

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
