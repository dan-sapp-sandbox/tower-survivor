"use client";
import * as ex from "excalibur";
import { Resources } from "./resources";

export class Tree extends ex.Actor {
  constructor(pos: ex.Vector) {
    super({
      pos,
      width: 48,
      height: 48,
      color: ex.Color.Green,
      z: -1,
    });

    this.on("exitviewport", () => this.kill());
  }

  override onInitialize(): void {
    const spriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.Trees,
      grid: {
        rows: 3,
        columns: 11,
        spriteWidth: 48,
        spriteHeight: 48,
      },
    });
    const treeSprite = spriteSheet.getSprite(0, 0);

    this.graphics.use(treeSprite);
  }
}
