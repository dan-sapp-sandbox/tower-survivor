import * as ex from 'excalibur';
import { Resources } from '../resources';
import { Config } from '../../config';

export const generateFloor = (engine: ex.Engine) => {
  const testTileMap = new ex.TileMap({
    pos: ex.vec(0,0),
    tileWidth: 250,
    tileHeight: 250,
    columns: Math.floor(Config.WorldWidth / 250),
    rows: Math.floor(Config.WorldHeight / 250),
  });

  const testTile = new ex.Sprite({ image: Resources.FieldsTileset });

  testTileMap.tiles.forEach(tile => tile.addGraphic(testTile));

  engine.currentScene.add(testTileMap);
};