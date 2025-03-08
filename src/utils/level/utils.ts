import * as ex from 'excalibur'
import { Config } from '../../config'
import { Tree } from './tree'
import { Enemy } from '../enemy/enemy';

export const makeTrees = (engine: ex.Engine) => {
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
            new ex.BoundingBox(pos.x, pos.y, pos.x + 200, pos.y + 200),
          )
        );
      });

      attempts++;
    } while (collides && attempts < 10);

    return pos;
  }

  const treePool: Tree[] = [];
  for (let i = 0; i < 500; i++) {
    const pos = generateTreePosition();
    const treeType = Math.floor(Math.random() * 999) % 3
    const treeSize = (Math.random() * Math.random() * Config.TreeSizeRange) + Config.TreeSizeMin
    const tree = new Tree(pos, treeType, treeSize);

    tree.on("exitviewport", () => tree.hide());
    tree.on("enterviewport", () => tree.graphics.opacity = 1);

    treePool.push(tree);
    engine.add(tree);
  }
};

export const makeEnemies = (engine: ex.Engine) => {
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
    const enemySize = (Math.random() * Math.random() * Math.random() * Config.EnemySizeRange) + Config.EnemySizeMin
    const enemy = new Enemy(pos, enemyType, enemySize);


    enemy.on("exitviewport", () => enemy.hide());
    enemy.on("enterviewport", () => enemy.graphics.opacity = 1);

    enemyPool.push(enemy);
    engine.add(enemy);
  }
};