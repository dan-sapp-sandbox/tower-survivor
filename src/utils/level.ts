import * as ex from "excalibur";
import { Player } from "./player";
import { Config } from "./config";
import { Tree } from "./tree";
import { Enemy } from "./enemy";
import { Resources } from "./resources";

export class Level extends ex.Scene {
  score: number = 0;
  best: number = 0;
  player: Player = new Player(this);

  startGameLabel = new ex.Label({
    text: "Tap to Start",
    x: 200,
    y: 200,
    z: 2,
    font: new ex.Font({
      size: 30,
      color: ex.Color.White,
      textAlign: ex.TextAlign.Center,
    }),
  });

  scoreLabel = new ex.Label({
    text: "Score: 0",
    x: 10,
    y: 10,
    z: 2,
    font: new ex.Font({
      size: 16,
      color: ex.Color.White,
    }),
  });

  bestLabel = new ex.Label({
    text: "Best: 0",
    x: 390,
    y: 10,
    z: 2,
    font: new ex.Font({
      size: 16,
      color: ex.Color.White,
      textAlign: ex.TextAlign.End,
    }),
  });

  override onActivate(): void {
    Resources.BackgroundMusic.loop = true;
    Resources.BackgroundMusic.play();
  }

  makeTrees = (engine: ex.Engine) => {
    function generateTreePosition(): ex.Vector {
      let attempts = 0;
      let pos: ex.Vector;
      let collides: boolean;

      do {
        pos = new ex.Vector(
          Math.random() * Config.WorldBounds.right,
          Math.random() * Config.WorldBounds.bottom,
        );

        collides = engine.currentScene.actors.some((actor) => {
          return (
            actor.collider.bounds.intersect(
              new ex.BoundingBox(pos.x, pos.y, pos.x + 64, pos.y + 80),
            )
          );
        });

        attempts++;
      } while (collides && attempts < 10); // Limit retries to avoid infinite loops

      return pos;
    }

    const treePool: Tree[] = [];
    for (let i = 0; i < 500; i++) {
      const pos = generateTreePosition();
      const tree = new Tree(pos, 0);

      tree.on("exitviewport", () => tree.hide());
      tree.on("enterviewport", () => tree.graphics.opacity = 1);

      treePool.push(tree);
      engine.add(tree);
    }
  };

  makeEnemies = (engine: ex.Engine) => {
    function generateEnemyPosition(): ex.Vector {
      let attempts = 0;
      let pos: ex.Vector;
      let collides: boolean;

      do {
        pos = new ex.Vector(
          Math.random() * Config.WorldBounds.right,
          Math.random() * Config.WorldBounds.bottom,
        );

        collides = engine.currentScene.actors.some((actor) => {
          return (
            actor.collider.bounds.intersect(
              new ex.BoundingBox(pos.x - 10, pos.y - 10, pos.x - 10, pos.y - 10),
            )
          );
        });

        attempts++;
      } while (collides && attempts < 10);

      return pos;
    }

    const enemyPool: Enemy[] = [];
    for (let i = 0; i < 500; i++) {
      const pos = generateEnemyPosition();
      const enemyType = Math.floor(Math.random() * 999) % 3
      const enemySize = (Math.random() * Config.EnemySizeRange) + Config.EnemySizeMin
      const enemy = new Enemy(pos, enemyType, enemySize);


      enemy.on("exitviewport", () => enemy.hide());
      enemy.on("enterviewport", () => enemy.graphics.opacity = 1);

      enemyPool.push(enemy);
      engine.add(enemy);
    }
  };

  override onInitialize(engine: ex.Engine): void {
    this.add(this.player);
    this.add(this.startGameLabel);
    this.add(this.scoreLabel);
    this.add(this.bestLabel);

    const bestScore = localStorage.getItem("bestScore");
    if (bestScore) {
      this.best = +bestScore;
      this.setBestScore(this.best);
    } else {
      this.setBestScore(0);
    }

    this.makeTrees(engine);
    this.makeEnemies(engine);

    this.player.start();
  }
  incrementScore() {
    this.scoreLabel.text = `Score: ${++this.score}`;
    this.setBestScore(this.score);
  }

  setBestScore(score: number) {
    if (score > this.best) {
      localStorage.setItem("bestScore", this.score.toString());
      this.best = score;
    }
    this.bestLabel.text = `Best: ${this.best}`;
  }

  reset() {
    this.player.reset();
    this.score = 0;
    this.scoreLabel.text = `Score: ${this.score}`;
  }

  triggerGameOver() {
    this.player.stop();
    this.player.reset();
    Resources.FailSound.play();
  }
}
