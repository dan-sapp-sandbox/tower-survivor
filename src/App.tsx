"use client";
import "./styles.css";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const App = () => {
  return (
    <div className="ui">
      <button
        id="mute"
        className="button-reset"
        aria-pressed="false"
        aria-label="Mute/Unmute"
      >
        <VolumeUpIcon
          fontSize="large"
          className="text-white unpressed"
        />
        <VolumeOffIcon fontSize="large" className="text-white pressed" />
      </button>
    </div>
  );
};

export default App;
