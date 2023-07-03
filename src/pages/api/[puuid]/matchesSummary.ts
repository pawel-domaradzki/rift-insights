import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const puuid = req.query.puuid as string;

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

    res.status(200).json(playerStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching match history details" });
  }
}
