import axios from "axios";

import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { summonerName } = req.query;
  const apiKey = process.env.RIOT_API_KEY;

  try {
    const { data } = await axios.get(
      `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
    );

    const summoner = await prisma.summoner.upsert({
      where: { id: data.id },
      update: {
        accountId: data.accountId,
        puuid: data.puuid,
        name: data.name,
        profileIconId: data.profileIconId,
        summonerLevel: data.summonerLevel,
      },
      create: {
        id: data.id,
        accountId: data.accountId,
        puuid: data.puuid,
        name: data.name,
        profileIconId: data.profileIconId,
        summonerLevel: data.summonerLevel,
      },
    });

    res.status(200).json(summoner);
  } catch (error: unknown) {
    console.log((error as Error).message);
  }
}
