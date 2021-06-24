import { useRef, useState, useContext, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import { useUser } from "../../store/user";
import { FightsContext } from "../../store/fightsContext";
import * as actionTypes from "../../store/user/userActionTypes";
import { useParams } from "react-router-dom";
import ArenaHeader from "./ArenaHeader";
import axios from "axios";

const COMPARE_IMG_URL = "https://css-fight-api.hntejas.repl.co/fight/submit";

export default function Arena() {
  const imgOverlayRef = useRef();
  const proxyOverlayRef = useRef();
  const outputWrapperRef = useRef();
  const targetRef = useRef();
  const sourceRef = useRef();

  const { user, userDispatch, userActionTypes } = useUser();
  const { fights } = useContext(FightsContext);
  const { fightId } = useParams();

  useEffect(() => {
    user.currentFightId != fightId &&
      userDispatch({
        type: userActionTypes.UPDATE_CURRENT_FIGHT,
        payload: {
          fightId: parseInt(fightId),
        },
      });
  }, []);

  useEffect(() => {
    setCode(
      user.fights.find((fight) => fight.fightId === user.currentFightId)
        .fightCode
    );
  }, [user]);

  const currentFightData = fights.find(
    (fight) => fight.fightId === user.currentFightId
  );
  const currentFightState = user.fights.find(
    (fight) => fight.fightId === user.currentFightId
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [code, setCode] = useState(currentFightState.fightCode);

  const checkAndSaveCode = (e) => {
    if (
      (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
      e.keyCode === 83
    ) {
      e.preventDefault();
      userDispatch({
        type: actionTypes.UPDATE_FIGHT_CODE,
        payload: {
          fightId: currentFightState.fightId,
          fightCode: code,
        },
      });
    }
  };

  const resetCode = () => {
    userDispatch({
      type: actionTypes.RESET_FIGHT_CODE,
      payload: {
        fightId: user.currentFightId,
      },
    });
  };

  const submitToDispatch = (imageCompareScore) => {
    userDispatch({
      type: actionTypes.SUBMIT_FIGHT,
      payload: {
        fightId: user.currentFightId,
        fightCode: code,
        fightScore: imageCompareScore,
      },
    });
  };

  const submitFight = async () => {
    setIsProcessing(true);
    try {
      const targetImageURI = await htmlToImage.toPng(targetRef.current);
      const sourceImageURI = await htmlToImage.toPng(
        sourceRef.current.contentWindow.document.body
      );
      const response = await axios.post(COMPARE_IMG_URL, {
        img1: targetImageURI,
        img2: sourceImageURI,
      });
      const imageCompareScore = parseFloat(
        (100 - response.data.rawMisMatchPercentage).toFixed(2)
      );
      submitToDispatch(imageCompareScore);
      setIsProcessing(false);
    } catch (e) {
      console.log(e);
      setIsProcessing(false);
    }
  };

  const imageCompareSlider = (e) => {
    if (user.allowSlideAndCompare) {
      proxyOverlayRef.current.style.cursor = "col-resize";
      imgOverlayRef.current.style["z-index"] = "15";
      imgOverlayRef.current.style["border-right"] = "3px solid red";
      imgOverlayRef.current.style.width =
        e.clientX - outputWrapperRef.current.offsetLeft + "px";
    }
  };

  const resetWidth = () => {
    if (user.allowSlideAndCompare) {
      proxyOverlayRef.current.style.cursor = "unset";
      imgOverlayRef.current.style["border-right"] = "none";
      imgOverlayRef.current.style["z-index"] = "9";
      imgOverlayRef.current.style.width = "400px";
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <ArenaHeader />
      <div
        className="arena"
        onKeyDown={checkAndSaveCode}
        key={user.currentFightId}
      >
        <div className="editor-container">
          <textarea
            disabled={!!isProcessing}
            id="editor"
            onChange={(e) => {
              setCode(e.target.value);
            }}
            value={code}
          ></textarea>
          <button className="btn-reset-code" onClick={resetCode}>
            Reset Code
          </button>
        </div>

        <div className="output-container">
          <div
            id="output-wrapper"
            className="output-wrapper"
            ref={outputWrapperRef}
          >
            <iframe
              id="source"
              ref={sourceRef}
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
            disabled={!!isProcessing}
          >
            Submit
          </button>
        </div>

        <div className="target-container">
          <img
            loading="lazy"
            id="target"
            ref={targetRef}
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
                <div className="color-wrapper" key={color}>
                  <div
                    className={"color-badge"}
                    style={{ background: color }}
                  ></div>{" "}
                  {color.toUpperCase()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
