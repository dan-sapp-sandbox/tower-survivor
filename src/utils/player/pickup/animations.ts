import * as ex from 'excalibur'
import { Pickup } from "./pickup";
import { Resources } from '../../resources';
import { Config } from '../../../config'

export const generateAnimations = (self: Pickup) => {
  const spriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.BlueCrystal,
    grid: {
      rows: 1,
      columns: 8,
      spriteWidth: 16,
      spriteHeight: 16,
    },
  });
  const basic = ex.Animation.fromSpriteSheet(
    spriteSheet,
    ex.range(0, 8),
    Config.CrystalAnimDuration,
  );

  self.graphics.add("crystalBasic", basic);

}