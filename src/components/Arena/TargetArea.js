import { forwardRef } from "react";
import { showToast } from "../../utils/helper";

const TargetArea = ({ currentFightData }, ref) => {
  const copyColorToClipboard = (color) => {
    const input = document.createElement("input");
    input.value = color;
    input.style.opacity = 0;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    showToast(`Color ${color} copied to clipboard`);
  };
  return (
    <div className="target-container">
      <img
        loading="lazy"
        id="target"
        ref={ref}
        src={currentFightData.fightImg}
        width="400px"
        height="300px"
        alt="level1"
      />
      <hr className="hr-divider" style={{ marginTop: "15px" }} />
      <h4>COLORS TO USE:</h4>
      <div className="color-container">
        {currentFightData.fightColors.map((color) => {
          return (
            <div
              className="color-wrapper"
              key={color}
              onClick={() => copyColorToClipboard(color)}
            >
              <div
                className={"color-badge"}
                style={{ background: color }}
              ></div>{" "}
              <span>{color.toUpperCase()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default forwardRef(TargetArea);
