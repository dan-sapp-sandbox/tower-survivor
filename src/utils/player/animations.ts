import * as ex from 'excalibur'
import { Player } from "./player";
import { Resources } from '../resources';

export const generateAnimations = (self: Player) => {
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
  const walkDown = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(0, 5),
    walkSpeed,
  );
  const walkUp = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(6, 11),
    walkSpeed,
  );
  const walkLeft = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(12, 17),
    walkSpeed,
  );
  const walkRight = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(18, 23),
    walkSpeed,
  );
  const idleDownSprite = spriteSheet.getSprite(0, 0);
  const idleUpSprite = spriteSheet.getSprite(0, 1);
  const idleLeftSprite = spriteSheet.getSprite(0, 2);
  const idleRightSprite = spriteSheet.getSprite(0, 3);

  // Register
  self.graphics.add("playerIdleDown", idleDownSprite);
  self.graphics.add("playerIdleUp", idleUpSprite);
  self.graphics.add("playerIdleLeft", idleLeftSprite);
  self.graphics.add("playerIdleRight", idleRightSprite);
  self.graphics.add("playerWalkDown", walkDown);
  self.graphics.add("playerWalkUp", walkUp);
  self.graphics.add("playerWalkLeft", walkLeft);
  self.graphics.add("playerWalkRight", walkRight);

}