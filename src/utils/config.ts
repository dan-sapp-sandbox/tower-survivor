import * as ex from "excalibur";

const WorldWidth = 8000;
const WorldHeight = 6000;

export const Config = {
  PlayerStartPos: ex.vec(WorldWidth / 2, WorldHeight / 2),
  PlayerVelocity: 150,
  EnemyVelocity: 30,
  EnemySizeMin: 1.1,
  EnemySizeRange: 1.7,
  WorldHeight,
  WorldWidth,
  ScreenWidth: 800,
  ScreenHeight: 600,
  WorldBounds: new ex.BoundingBox(0, 0, WorldWidth, WorldHeight),
} as const;
