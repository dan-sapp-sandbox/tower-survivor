import * as ex from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";
import { Config } from './config'

export class Enemy extends ex.Actor {
  enemyType: number;
  enemySize: number;
  downWalk!: ex.Animation;
  upWalk!: ex.Animation;
  leftWalk!: ex.Animation;
  rightWalk!: ex.Animation;
  constructor(pos: ex.Vector, enemyType: number, enemySize: number) {
    super({
      pos,
      width: 1,
      height: 1,
      color: ex.Color.Green,
      z: -1,
      collisionType: ex.CollisionType.Active
    });
    this.enemyType = enemyType;
    this.enemySize = enemySize;
    this.graphics.opacity = 1;
  }

  reset(pos: ex.Vector) {
    this.pos = pos;
    this.graphics.opacity = 1;
  }

  hide() {
    this.graphics.opacity = 0;
  }

  override onInitialize(): void {
    let spriteType;
    switch (this.enemyType) {
      case 0:
        spriteType = Resources.Slime1
        break;
      case 1:
        spriteType = Resources.Slime2
        break;
      case 2:
        spriteType = Resources.Slime3
        break;
      default:
        spriteType = Resources.Slime1
      
    }
    const spriteSheet = ex.SpriteSheet.fromImageSource({
      image: spriteType,
      grid: {
        rows: 4,
        columns: 8,
        spriteWidth: 34,
        spriteHeight: 32,
      },
      spacing: {
        // pixels from the top left to start the sprite parsing
        originOffset: {
          x: 15,
          y: 15
        },
        // pixels between each sprite while parsing
        margin: {
          x: 30,
          y: 32
        }
      }
    });
    this.downWalk = ex.Animation.fromSpriteSheet(
      spriteSheet,
      ex.range(0, 7),
      Config.EnemyAnimDuration,
    );
    this.upWalk = ex.Animation.fromSpriteSheet(
      spriteSheet,
      ex.range(8, 15),
      Config.EnemyAnimDuration,
    );
    this.leftWalk = ex.Animation.fromSpriteSheet(
      spriteSheet,
      ex.range(16, 23),
      Config.EnemyAnimDuration,
    );
    this.rightWalk = ex.Animation.fromSpriteSheet(
      spriteSheet,
      ex.range(24, 31),
      Config.EnemyAnimDuration,
    );
    const enemySprite = spriteSheet.getSprite(this.enemyType, 0);

    this.graphics.use(enemySprite);
    this.scale = new ex.Vector(this.enemySize, this.enemySize);
  }

  // Update method for moving the enemy towards the player
  override onPostUpdate(engine: ex.Engine): void {
    const player = engine.currentScene.actors.find(actor => actor instanceof Player);

    if (player) {
      const direction = player.pos.sub(this.pos).normalize();
      this.vel = direction.scale(Config.EnemyVelocity);

      // Handle animation based on movement direction
      if (Math.abs(this.vel.x) > Math.abs(this.vel.y)) {
        // Horizontal movement
        if (this.vel.x > 0) {
          this.graphics.use(this.rightWalk);  // Move right
        } else {
          this.graphics.use(this.leftWalk);   // Move left
        }
      } else {
        // Vertical movement
        if (this.vel.y > 0) {
          this.graphics.use(this.downWalk);  // Move down
        } else {
          this.graphics.use(this.upWalk);    // Move up
        }
      }
    }
  }
}
