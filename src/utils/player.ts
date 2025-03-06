import * as ex from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";
import { Level } from "./level";

export class Player extends ex.Actor {
  playing = false;
  downVamp!: ex.Animation;
  upVamp!: ex.Animation;
  leftVamp!: ex.Animation;
  rightVamp!: ex.Animation;
  lastKeyPressed!: ex.Keys;
  constructor(private level: Level) {
    super({
      pos: Config.PlayerStartPos,
      radius: 32,
      color: ex.Color.Yellow,
      collisionType: ex.CollisionType.Active,
    });
  }

  override onInitialize(engine: ex.Engine): void {
    engine.input.keyboard.on("press", (evt) => {
      this.lastKeyPressed = evt.key;
    });
    engine.input.keyboard.on("hold", (evt) => {
      this.lastKeyPressed = evt.key;
    });
    const spriteSheet = ex.SpriteSheet.fromImageSource({
      image: Resources.Vampire,
      grid: {
        rows: 4,
        columns: 6,
        spriteWidth: 64,
        spriteHeight: 64,
      },
    });
    const walkSpeed = 75;
    this.downVamp = ex.Animation.fromSpriteSheet(
      spriteSheet,
      ex.range(0, 5),
      walkSpeed,
    );
    this.upVamp = ex.Animation.fromSpriteSheet(
      spriteSheet,
      ex.range(6, 11),
      walkSpeed,
    );
    this.leftVamp = ex.Animation.fromSpriteSheet(
      spriteSheet,
      ex.range(12, 17),
      walkSpeed,
    );
    this.rightVamp = ex.Animation.fromSpriteSheet(
      spriteSheet,
      ex.range(18, 23),
      walkSpeed,
    );
    const startDownSprite = spriteSheet.getSprite(0, 0);
    const startUpSprite = spriteSheet.getSprite(0, 1);
    const startLeftSprite = spriteSheet.getSprite(0, 2);
    const startRightSprite = spriteSheet.getSprite(0, 3);

    // Register
    this.graphics.add("startDown", startDownSprite);
    this.graphics.add("startUp", startUpSprite);
    this.graphics.add("startRight", startRightSprite);
    this.graphics.add("startLeft", startLeftSprite);
    this.graphics.add("downVamp", this.downVamp);
    this.graphics.add("upVamp", this.upVamp);
    this.graphics.add("rightVamp", this.rightVamp);
    this.graphics.add("leftVamp", this.leftVamp);

    this.graphics.use("startDown");

    engine.currentScene.camera.strategy.lockToActor(this);
    engine.currentScene.camera.strategy.limitCameraBounds(Config.WorldBounds);

    this.on("exitviewport", () => {
      this.level.triggerGameOver();
    });
  }

  override onPostUpdate(engine: ex.Engine): void {
    if (!this.playing) return;

    if (engine.input.keyboard.isHeld(ex.Keys.S)) {
      this.graphics.use("downVamp");
      this.vel.y = Config.PlayerVelocity;
    } else if (engine.input.keyboard.isHeld(ex.Keys.W)) {
      this.graphics.use("upVamp");
      this.vel.y = -Config.PlayerVelocity;
    } else {
      this.vel.y = 0;
    }
    if (engine.input.keyboard.isHeld(ex.Keys.D)) {
      this.graphics.use("rightVamp");
      this.vel.x = Config.PlayerVelocity;
    } else if (engine.input.keyboard.isHeld(ex.Keys.A)) {
      this.graphics.use("leftVamp");
      this.vel.x = -Config.PlayerVelocity;
    } else {
      this.vel.x = 0;
    }
    if (!this.vel.x && !this.vel.y) {
      switch (this.lastKeyPressed) {
        case ex.Keys.S:
          this.graphics.use("startDown");
          break;
        case ex.Keys.W:
          this.graphics.use("startUp");
          break;
        case ex.Keys.D:
          this.graphics.use("startRight");
          break;
        case ex.Keys.A:
          this.graphics.use("startLeft");
          break;
        default:
          this.graphics.use("startDown");
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
    // this.level.triggerGameOver();
  }

  override onPreUpdate() {
    // Keep player inside world bounds using Math.min() and Math.max()
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
