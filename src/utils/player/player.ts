import * as ex from "excalibur";
import { Config } from "../config";
import { Level } from "../level/level";
import { Enemy } from "../enemy/enemy";
import { Projectile } from "./projectile";
import { generateAnimations } from "./animations";

export class Player extends ex.Actor {
  playing = false;
  downVamp!: ex.Animation;
  upVamp!: ex.Animation;
  leftVamp!: ex.Animation;
  rightVamp!: ex.Animation;
  lastKeyPressed!: ex.Keys;
  experience: number = 0;
  constructor(private level: Level) {
    super({
      pos: Config.PlayerStartPos,
      radius: 32,
      color: ex.Color.Yellow,
      collisionType: ex.CollisionType.Active,
    });
    this.level = level
  }

  incrementXp = (newXp: number) => {
    this.experience += newXp;
    this.level.updateXpDisplay(this.experience)
  }

  fireProjectile(engine: ex.Engine) {
    const nearestEnemy = this.findNearestEnemy(engine);
    if (nearestEnemy) {
      const projectile = new Projectile(this.pos.clone(), nearestEnemy, Config.ProjectileSpeed, this.incrementXp);
      engine.currentScene.add(projectile);
    }
  }

  findNearestEnemy(engine: ex.Engine): Enemy | null {
    const enemies = engine.currentScene.actors.filter(actor => actor instanceof Enemy);
    if (enemies.length === 0) {
      return null;
    }
    return enemies.reduce((nearest, current) => {
      const nearestDistance = this.pos.distance(nearest.pos);
      const currentDistance = this.pos.distance(current.pos);
      return currentDistance < nearestDistance ? current : nearest;
    });
  }

  override onInitialize(engine: ex.Engine): void {
    engine.input.keyboard.on("press", (evt) => {
      this.lastKeyPressed = evt.key;
    });
    engine.input.keyboard.on("hold", (evt) => {
      this.lastKeyPressed = evt.key;
    });
    
    generateAnimations(this);
    this.graphics.use("playerIdleDown");

    engine.currentScene.camera.strategy.lockToActor(this);
    engine.currentScene.camera.strategy.limitCameraBounds(Config.WorldBounds);

    setInterval(() => this.fireProjectile(engine), Config.ProjectileRate);

    this.on("exitviewport", () => {
      this.level.triggerGameOver();
    });
  }

  override onPostUpdate(engine: ex.Engine): void {
    if (!this.playing) return;

    if (engine.input.keyboard.isHeld(ex.Keys.S)) {
      this.graphics.use("playerWalkDown");
      this.vel.y = Config.PlayerVelocity;
    } else if (engine.input.keyboard.isHeld(ex.Keys.W)) {
      this.graphics.use("playerWalkUp");
      this.vel.y = -Config.PlayerVelocity;
    } else {
      this.vel.y = 0;
    }
    if (engine.input.keyboard.isHeld(ex.Keys.D)) {
      this.graphics.use("playerWalkRight");
      this.vel.x = Config.PlayerVelocity;
    } else if (engine.input.keyboard.isHeld(ex.Keys.A)) {
      this.graphics.use("playerWalkLeft");
      this.vel.x = -Config.PlayerVelocity;
    } else {
      this.vel.x = 0;
    }
    if (!this.vel.x && !this.vel.y) {
      switch (this.lastKeyPressed) {
        case ex.Keys.S:
          this.graphics.use("playerIdleDown");
          break;
        case ex.Keys.W:
          this.graphics.use("playerIdleUp");
          break;
        case ex.Keys.D:
          this.graphics.use("playerIdleRight");
          break;
        case ex.Keys.A:
          this.graphics.use("playerIdleLeft");
          break;
        default:
          this.graphics.use("playerIdleDown");
      }
    }
  }

  start() {
    this.playing = true;
    this.pos = Config.PlayerStartPos;
    this.acc = ex.vec(0, 0);
  }

  reset() {
    this.pos = Config.PlayerStartPos;
    this.stop();
  }

  stop() {
    this.vel = ex.vec(0, 0);
    this.acc = ex.vec(0, 0);
  }

  override onCollisionStart(_self: ex.Collider): void {
    this.stop();
  }

  override onPreUpdate() {
    this.pos.x = Math.max(
      Config.WorldBounds.left,
      Math.min(this.pos.x, Config.WorldBounds.right - this.width),
    );
    this.pos.y = Math.max(
      Config.WorldBounds.top,
      Math.min(this.pos.y, Config.WorldBounds.bottom - this.height),
    );
  }
}
