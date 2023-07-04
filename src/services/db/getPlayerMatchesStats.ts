import prisma from "@/lib/prisma";


export async function getPlayerMatchesStats(puuid: string) {
    try {
      const playerStats = await prisma.playerMatchStats.findMany({
        where: {
          puuid: puuid,
        },
        select: {
          puuid: true,
          item0: true,
          item1: true,
          item2: true,
          item3: true,
          item4: true,
          item5: true,
          item6: true,
          kills: true,
          assists: true,
          deaths: true,
          championId: true,
          totalDamageDealtToChampions: true,
          totalMinionsKilled: true,
          goldEarned: true,
          wardsPlaced: true,
        },
      });
      return playerStats;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching match history details");
    }
  }
  