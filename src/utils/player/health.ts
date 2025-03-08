import { Level } from "../level/level";
import { Player } from "./player";
import * as ex from 'excalibur'

export const generateHealthCounter = (player: Player, level: Level) => {
  const healthText = new ex.ScreenElement({
    x: 20,
    y: 5,
  });
  const healthLabel = new ex.Label({
    text: `Health: ${player.health}`,
    pos: ex.vec(0, 0),
    font: new ex.Font({
      size: 20,
      color: ex.Color.White,
    }),
  });

  healthText.addChild(healthLabel);
  level.add(healthText);

  return healthLabel
}