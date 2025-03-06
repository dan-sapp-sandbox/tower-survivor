import * as ex from "excalibur";
import { Player } from "./player";
import { TreeFactory } from "./tree-factory";
import { Resources } from "./resources";

export class Level extends ex.Scene {
  score: number = 0;
  best: number = 0;
  treeFactory = new TreeFactory(this);
  player = new Player(this);

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
      size: 20,
      color: ex.Color.White,
    }),
  });

  bestLabel = new ex.Label({
    text: "Best: 0",
    x: 390,
    y: 10,
    z: 2,
    font: new ex.Font({
      size: 20,
      color: ex.Color.White,
      textAlign: ex.TextAlign.End,
    }),
  });

  override onActivate(): void {
    Resources.BackgroundMusic.loop = true;
    Resources.BackgroundMusic.play();
  }

  override onInitialize(): void {
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

    this.showStartInstructions();
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

  showStartInstructions() {
    this.startGameLabel.graphics.isVisible = true;
    this.engine.input.pointers.once("down", () => {
      this.reset();

      this.startGameLabel.graphics.isVisible = false;
      this.player.start();
    });
  }

  reset() {
    this.player.reset();
    this.score = 0;
    this.scoreLabel.text = `Score: ${this.score}`;
  }

  triggerGameOver() {
    this.player.stop();
    this.showStartInstructions();
    Resources.FailSound.play();
  }
}
