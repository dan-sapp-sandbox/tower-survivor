import {Config} from '../config'

const PauseMenu = () => {
  //TODO: move sound here
  return (
    <div
      id="pause-menu"
      className="bg-blue-300 fixed h-24 w-36"
      style={{
        top: `${-75 - Config.ScreenHeight / 2}px`,
        left: `${-50 + Config.ScreenWidth / 2}px`,
        visibility: 'hidden'
      }}
    >
      <span className='text-center mx-auto mt-2'>
        Paused
      </span>
    </div>
  );
};

export default PauseMenu;
