import * as ex from "excalibur";
import { Config } from '../../../config'
import { generateAnimations } from './animations'

export class Pickup extends ex.Actor {
  constructor(pos: ex.Vector) {
    super({
      pos,
      width: 1,
      height: 1,
      z: 10,
      collisionType: ex.CollisionType.Active
    });
  }

  override onInitialize(): void {
    generateAnimations(this);
    this.graphics.use("crystalBasic");
    this.scale = new ex.Vector(Config.CrystalSize, Config.CrystalSize);
  }
}
