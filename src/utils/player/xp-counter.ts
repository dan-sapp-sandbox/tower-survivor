import { Level } from "../level/level";
import { Player } from "./player";
import * as ex from 'excalibur'

export const generateXpCounter = (player: Player, level: Level) => {
  const xpText = new ex.ScreenElement({
    x: 20,
    y: 25,
    z: 50
  });
  const xpLabel = new ex.Label({
    text: `Experience: ${player.experience}`,
    pos: ex.vec(0, 0),
    font: new ex.Font({
      size: 20,
      color: ex.Color.White,
    }),
  });

  xpText.addChild(xpLabel);
  level.add(xpText);

  return xpLabel
}