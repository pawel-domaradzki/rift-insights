// matchDetailsService.ts
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
