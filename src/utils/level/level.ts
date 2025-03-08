import * as ex from "excalibur";
import { Player } from "../player/player";
import * as utils from './utils';
import { Resources } from "../resources";
import { generatePauseScreen } from './pause'

export class Level extends ex.Scene {
  player: Player = new Player(this);

  updateXpDisplay = (xp: number) => {
    this.xpLabel.text = `Experience: ${xp}`
  }

  xpText = new ex.ScreenElement({
    x: 20,
    y: 20,
  });
  xpLabel = new ex.Label({
    text: `Experience: ${this.player.experience}`,
    pos: ex.vec(0, 0),
    font: new ex.Font({
      size: 32,
      color: ex.Color.White,
    }),
  });

  override onActivate(): void {
    Resources.BackgroundMusic.loop = true;
    Resources.BackgroundMusic.play();
  }

  override onInitialize(engine: ex.Engine): void {
    generatePauseScreen(engine);

    this.xpText.addChild(this.xpLabel);
    this.add(this.xpText);
    this.add(this.player);

    utils.makeTrees(engine);
    utils.makeEnemies(engine);

    this.player.start();
  }

  reset() {
    this.player.reset();
  }

  triggerGameOver() {
    this.player.stop();
    this.player.reset();
    // Resources.FailSound.play();
  }
}
