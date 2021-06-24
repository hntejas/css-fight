import { forwardRef, useRef } from "react";

const ResultPreview = (
  {
    currentFightData,
    currentFightState,
    code,
    allowSlideAndCompare,
    submitFight,
    disabled,
  },
  ref
) => {
  const imgOverlayRef = useRef();
  const proxyOverlayRef = useRef();
  const outputWrapperRef = useRef();

  const imageCompareSlider = (e) => {
    if (allowSlideAndCompare) {
      proxyOverlayRef.current.style.cursor = "col-resize";
      imgOverlayRef.current.style["z-index"] = "15";
      imgOverlayRef.current.style["border-right"] = "3px solid red";
      imgOverlayRef.current.style.width =
        e.clientX - outputWrapperRef.current.offsetLeft + "px";
    }
  };

  const resetWidth = () => {
    if (allowSlideAndCompare) {
      proxyOverlayRef.current.style.cursor = "unset";
      imgOverlayRef.current.style["border-right"] = "none";
      imgOverlayRef.current.style["z-index"] = "9";
      imgOverlayRef.current.style.width = "400px";
    }
  };
  return (
    <div className="output-container">
      <div
        id="output-wrapper"
        className="output-wrapper"
        ref={outputWrapperRef}
      >
        <iframe
          id="source"
          ref={ref}
          className="iframe-output"
          width="400px"
          height="300px"
          title="output"
          srcDoc={code}
        ></iframe>
        <div
          ref={proxyOverlayRef}
          className="overlay"
          onMouseMove={imageCompareSlider}
          onMouseLeave={resetWidth}
        ></div>
        <div id="img-overLay" className="img-overLay" ref={imgOverlayRef}>
          <img
            src={currentFightData.fightImg}
            width="400px"
            height="300px"
            alt="level1"
          />
        </div>
      </div>
      <hr className="hr-divider" />
      <h4>YOUR SCORE:</h4>
      <div className="scoreboard-container">
        <h5>Last Score : {currentFightState.fightLastScore}%</h5>
        <h5>Highest Score : {currentFightState.fightHighScore}%</h5>
      </div>
      <button
        className="btn-submit-code"
        onClick={submitFight}
        disabled={disabled}
      >
        Submit
      </button>
    </div>
  );
};

export default forwardRef(ResultPreview);
