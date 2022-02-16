export function getPlayerBoardPosition(playerLocationOnPath: number): number {
  return Math.floor(playerLocationOnPath / 0.025);
}
