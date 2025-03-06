import * as ex from "excalibur";
import { Tree } from "./tree";
import { Level } from "./level";

export class TreeFactory {
  private timer: ex.Timer;
  constructor(
    private level: Level,
    private random: ex.Random,
    intervalMs: number,
  ) {
    this.timer = new ex.Timer({
      interval: intervalMs,
      repeats: true,
      action: () => this.spawnPipes(),
    });
    this.level.add(this.timer);
  }

  spawnPipes() {
    const randomTreePositionY = this.random.floating(
      0,
      this.level.engine.screen.resolution.height,
    );
    const randomTreePositionX = this.random.floating(
      0,
      this.level.engine.screen.resolution.width,
    );

    const bottomPipe = new Tree(
      ex.vec(
        randomTreePositionX / 2,
        randomTreePositionY,
      ),
    );
    this.level.add(bottomPipe);

    const topPipe = new Tree(
      ex.vec(randomTreePositionX, randomTreePositionY / 2),
    );
    this.level.add(topPipe);
  }

  start() {
    this.timer.start();
  }

  reset() {
    for (const actor of this.level.actors) {
      actor.kill();
    }
  }

  stop() {
    this.timer.stop();
    for (const actor of this.level.actors) {
      actor.vel = ex.vec(0, 0);
    }
  }
}
