import prisma from "@/lib/prisma";

export async function storeMatchDetails(
  matchId: string,
  gameMode: string,
  participants: any[]
) {
  try {
    const existingMatchDetails = await prisma.matchDetails.findUnique({
      where: { id: matchId },
    });

    if (existingMatchDetails) {
      return existingMatchDetails;
    }

    const matchDetails = await prisma.matchDetails.create({
      data: {
        id: matchId,
        gameMode,
        participants: {
          create: participants,
        },
      },
    });

    return matchDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface MatchHistory {
  summonerId: string;
  matchId: string;
  gameCreation: number;
}

export async function storeMatchHistory({
  summonerId,
  matchId,
  gameCreation,
}: MatchHistory) {
  try {
    const existingMatchHistory = await prisma.matchHistory.findUnique({
      where: { id: matchId },
    });

    if (existingMatchHistory) {
      return existingMatchHistory;
    }

    const matchHistory = await prisma.matchHistory.create({
      data: {
        summonerId: summonerId,
        id: matchId,
        gameCreatedAt: gameCreation,
      },
    });

    return matchHistory;
  } catch (error) {
    console.error(error);
    return null;
  }
}
