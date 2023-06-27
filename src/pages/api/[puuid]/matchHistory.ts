import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import axios from "axios";
import { fetchMatchDetails } from "@/lib/services/match/fetch";
import { storeMatchDetails } from "@/lib/services/match/store";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const puuid = req.query.puuid as string;
    const apiKey = process.env.RIOT_API_KEY;

    const summoner = await prisma.summoner.findUnique({
      where: {
        puuid: puuid,
      },
    });

    try {
      const response = await axios.get(
        `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
        {
          headers: { "X-Riot-Token": apiKey },
        }
      );

      if (summoner) {
        const matchIds = response.data;

        for (const matchId of matchIds) {
            const matchDetails = await fetchMatchDetails(matchId);

            if (matchDetails) {
              await storeMatchDetails(matchId, matchDetails.gameMode, matchDetails.participants);
            }
          
        }

        res.status(200).json(matchIds);
      } else {
        console.log("Summoner not found");
        res.status(404).json({ error: "Summoner not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching match history" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
