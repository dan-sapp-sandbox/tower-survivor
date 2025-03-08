import * as ex from "excalibur";
import { Resources } from "../resources";
import { Enemy } from "../enemy/enemy";
import { Config } from "../config";

export class Projectile extends ex.Actor {
  target: Enemy;
  speed: number;
  incrementXp: (xp: number) => void;

  constructor(pos: ex.Vector, target: Enemy, speed: number, incrementXp: (xp: number) => void) {
    super({
      pos,
      width: 30,
      height: 30,
      color: ex.Color.Red,
      collisionType: ex.CollisionType.Passive,
      z: 1,
    });
    this.target = target;
    this.speed = speed;
    this.incrementXp = incrementXp;
  }

  override onInitialize() {
    const spriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.Slime1,
      grid: {
        rows: 4,
        columns: 8,
        spriteWidth: 34,
        spriteHeight: 32,
      },
      spacing: {
        originOffset: {
          x: 15,
          y: 15
        },
        margin: {
          x: 30,
          y: 32
        }
      }
    });
    const enemySprite = spriteSheet.getSprite(0, 1);
    this.scale = new ex.Vector(Config.ProjectileSize, Config.ProjectileSize);
    this.graphics.use(enemySprite);
  }

  override onPostUpdate() {
    const direction = this.target.pos.sub(this.pos).normalize();
    this.vel = direction.scale(this.speed);

  }

  override onCollisionStart(_self: ex.Collider, other: ex.Collider): void {
    if (other.owner instanceof Enemy) {
      this.kill();
      this.target.kill();
      this.incrementXp(this.target.xp)
    }
  }
}