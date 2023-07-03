import axios from "axios";

import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import { getQueryParam } from "@/lib/util/getQueryParam";
import { Regions } from "@/lib/services/constants/regions";
import { storeMatchHistoryForSummoner } from "@/app/_queries/search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const summonerName = getQueryParam(req.query.summonerName);
  const region = getQueryParam(req.query.region, Object.values(Regions));

  if (!region) {
    return res.status(400).json({ error: "Invalid region" });
  }

  try {
    let summoner = await prisma.summoner.findFirst({
      where: {
        name: summonerName,
        region: region,
      },
    });

    if (!summoner) {
      const apiKey = process.env.RIOT_API_KEY;
      const { data } = await axios.get(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
      );

      summoner = await prisma.summoner.upsert({
        where: { id: data.id },
        update: {
          accountId: data.accountId,
          puuid: data.puuid,
          name: data.name,
          profileIconId: data.profileIconId,
          summonerLevel: data.summonerLevel,
          region: region,
        },
        create: {
          id: data.id,
          accountId: data.accountId,
          puuid: data.puuid,
          name: data.name,
          profileIconId: data.profileIconId,
          summonerLevel: data.summonerLevel,
          region: region,
        },
      });
    }

    // storeMatchHistoryForSummoner(summoner.puuid).catch((error) => {
    //   console.error("Error storing match history", error);
    // });

    res.status(200).json(summoner);
  } catch (error: any) {
    console.error(error);

    if (error.response && error.response.status === 403) {
      res.status(403).json({ message: "Invalid api token." });
    }

    if (error.response && error.response.status === 429) {
      res.status(429).json({ message: "Rate limit exceeded from Riot API." });
    } else {
      res.status(500).json({
        message: "An error occurred while fetching the summoner data.",
      });
    }
  }
}
