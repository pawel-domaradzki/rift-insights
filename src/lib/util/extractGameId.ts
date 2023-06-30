export function extractGameId(matchId: string) {
  const parts = matchId.split("_");
  return parts.length > 1 ? parts[1] : null;
}
