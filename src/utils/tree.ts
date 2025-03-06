import * as ex from "excalibur";
import { Resources } from "./resources";

export class Tree extends ex.Actor {
  index: number;
  constructor(pos: ex.Vector, index: number) {
    super({
      pos,
      width: 30,
      height: 50,
      color: ex.Color.Green,
      z: -1,
      collisionType: ex.CollisionType.Fixed,
    });
    this.index = index;
    this.graphics.opacity = 1;
  }

  reset(pos: ex.Vector) {
    this.pos = pos;
    this.graphics.opacity = 1; // Show when entering viewport
  }

  hide() {
    this.graphics.opacity = 0; // Hide off-screen instead of removing
  }

  override onInitialize(): void {
    const spriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.Trees,
      grid: {
        rows: 3,
        columns: 11,
        spriteWidth: 62,
        spriteHeight: 78,
      },
      spacing: {
        // pixels from the top left to start the sprite parsing
        originOffset: {
          x: 1,
          y: 0
        },
        // pixels between each sprite while parsing
        margin: {
          x: 0,
          y: 0
        }
      }
    });
    const treeSprite = spriteSheet.getSprite(this.index, 0);

    this.graphics.use(treeSprite);
  }
}
