import * as ex from "excalibur";
import { Tree } from "./tree";
import { Level } from "./level";

export class TreeFactory {
  private timer: ex.Timer;
  constructor(
    private level: Level,
  ) {
    this.timer = new ex.Timer({
      interval: 100,
      repeats: false,
      action: () => this.spawnTrees(),
    });
    this.level.add(this.timer);
    this.start();
  }

  spawnTrees() {
    let i;
    for (i = 0; i < 10; i++) {
      const newTree = new Tree(ex.vec(0, i * 80));
      this.level.add(newTree);
    }
    for (i = 0; i < 10; i++) {
      const newTree = new Tree(ex.vec(i * 80, 0));
      this.level.add(newTree);
    }
    for (i = 0; i < 10; i++) {
      const newTree = new Tree(ex.vec(i * 80, 475));
      this.level.add(newTree);
    }
    for (i = 0; i < 10; i++) {
      const newTree = new Tree(ex.vec(400, i * 80));
      this.level.add(newTree);
    }
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
