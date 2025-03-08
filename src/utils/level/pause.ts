import * as ex from 'excalibur'

export const generatePauseScreen = (engine: ex.Engine) => {

  let isPaused = false;

  const togglePause = (isPaused: boolean) => {
    if (isPaused) {
      engine.clock.stop();
    } else {
      engine.clock.start();
    }
  }

  engine.input.keyboard.on('press', (evt) => {
    if (evt.key === ex.Keys.Escape) {
      isPaused = !isPaused;
      togglePause(isPaused);
    }
  });

}