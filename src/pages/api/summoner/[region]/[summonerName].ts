import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import { getQueryParam } from "@/shared/utils/getQueryParam";
import { Regions } from "@/shared/constants/regions";
import { getRiotSummoner } from "@/services/riot/getSummoner";
import { storeSummoner } from "@/services/db/storeSummoner";

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
      const summonerData = await getRiotSummoner(region, summonerName);
      summoner = await storeSummoner(summonerData, region);
    }

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
