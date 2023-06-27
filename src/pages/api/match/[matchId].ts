import { storeMatchDetails } from "@/lib/services/match/store";
import { fetchMatchDetails } from "@/lib/services/match/fetch";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const matchId = req.query.matchId as string;

  try {
    const matchDetails = await fetchMatchDetails(matchId);

    if (matchDetails) {
      await storeMatchDetails(matchId, matchDetails.gameMode, matchDetails.participants);
      return res.status(200).json(matchDetails);
    } else {
        return res.status(404).json({ error: "Match details not found." });
      }


  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}
