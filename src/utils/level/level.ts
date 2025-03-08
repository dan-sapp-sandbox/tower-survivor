import * as ex from "excalibur";
import { Player } from "../player/player";
import * as utils from './utils';
import { Resources } from "../resources";
import { generatePauseScreen } from './pause'
import { generateFloor } from './floor'

export class Level extends ex.Scene {
  player: Player = new Player(this);

  override onActivate(): void {
    Resources.BackgroundMusic.loop = true;
    Resources.BackgroundMusic.play();
  }

  override onInitialize(engine: ex.Engine): void {
    generatePauseScreen(engine);
    generateFloor(engine);

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
