import { storeMatch } from "@/lib/services/match/store";
import { fetchMatchDetails } from "@/lib/services/match/fetch";

import type { NextApiRequest, NextApiResponse } from "next";
import { getQueryParam } from "@/lib/util/getQueryParam";
import { Regions } from "@/lib/services/constants/regions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const gameId = getQueryParam(req.query.gameId);
  const region = getQueryParam(req.query.region, Object.values(Regions));  

  try {
    const matchDetails = await fetchMatchDetails(gameId);

    if (matchDetails) {
      const { gameMode, gameCreation } = matchDetails;
      await storeMatch({
        gameId,
        gameMode,
        gameCreation,
        region: region,
      });
      return res.status(200).json(matchDetails);
    } else {
      return res.status(404).json({ error: "Match details not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}
