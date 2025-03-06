import * as ex from "excalibur";
import { Resources } from "./resources";

export class Tree extends ex.Actor {
  treeType: number;
  treeSize: number;
  constructor(pos: ex.Vector, treeType: number, treeSize: number) {
    super({
      pos,
      width: 64,
      height: 78,
      color: ex.Color.Green,
      z: -1,
      collisionType: ex.CollisionType.Fixed,
    });
    this.treeType = treeType;
    this.treeSize = treeSize;
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
        spriteWidth: 64,
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

    const treeSprite = spriteSheet.getSprite(this.treeType, 0);

    this.scale = new ex.Vector(this.treeSize, this.treeSize);
    
    this.graphics.use(treeSprite);
  }
}
