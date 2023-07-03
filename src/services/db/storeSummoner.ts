import prisma from "@/lib/prisma";

export const storeSummoner = async (summonerData: any, region: string) => {
  return await prisma.summoner.upsert({
    where: { id: summonerData.id },
    update: {
      accountId: summonerData.accountId,
      puuid: summonerData.puuid,
      name: summonerData.name,
      profileIconId: summonerData.profileIconId,
      summonerLevel: summonerData.summonerLevel,
      region: region,
    },
    create: {
      id: summonerData.id,
      accountId: summonerData.accountId,
      puuid: summonerData.puuid,
      name: summonerData.name,
      profileIconId: summonerData.profileIconId,
      summonerLevel: summonerData.summonerLevel,
      region: region,
    },
  });
};
