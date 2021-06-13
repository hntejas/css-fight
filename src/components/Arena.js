import { useRef, useState, useContext, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import { UserContext } from "../store/userContext";
import { FightsContext } from "../store/fightsContext";
import * as actionTypes from "../store/userActionTypes";

const COMPARE_IMG_URL = "https://i12d0.sse.codesandbox.io/";

export default function Arena() {
  const imgOverlayRef = useRef();
  const proxyOverlayRef = useRef();
  const outputWrapperRef = useRef();
  const targetRef = useRef();
  const sourceRef = useRef();

  const { userState, userStateDispatch } = useContext(UserContext);
  const { fights } = useContext(FightsContext);

  useEffect(
    function () {
      setCode(
        userState.fights.find(
          (fight) => fight.fightId === userState.currentFightId
        ).fightCode
      );
    },
    [userState]
  );

  function checkAndSaveCode(e) {
    if (
      (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
      e.keyCode === 83
    ) {
      e.preventDefault();
      userStateDispatch({
        type: actionTypes.UPDATE_FIGHT_CODE,
        payload: {
          fightId: currentFightState.fightId,
          fightCode: code
        }
      });
    }
  }

  function resetCode() {
    userStateDispatch({
      type: actionTypes.RESET_FIGHT_CODE,
      payload: {
        fightId: userState.currentFightId
      }
    });
  }

  // const head = `<head>
  // <style type="text/css">
  //   body{
  //     width: 400px;
  //     height: 300px;
  //     overflow: hidden;
  //     margin: 0;
  //   }
  // </style>
  // </head>`;

  function submitFight() {
    setIsProcessing(true);
    htmlToImage
      .toPng(targetRef.current)
      .then(function (targetImageURI) {
        htmlToImage
          .toPng(sourceRef.current.contentWindow.document.body)
          .then(function (sourceImageURI) {
            console.log({ sourceImageURI });
            fetch(COMPARE_IMG_URL, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                img1: targetImageURI,
                img2: sourceImageURI
              })
            })
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                const imageCompareScore = parseFloat(
                  (100 - data.rawMisMatchPercentage).toFixed(2)
                );
                submitToDispatch(imageCompareScore);
                setIsProcessing(false);
              })
              .catch((e) => {
                console.log(e);
                setIsProcessing(false);
              });
          });
      })
      .catch((e) => {
        console.log(e);
        setIsProcessing(false);
      });
  }

  function submitToDispatch(imageCompareScore) {
    userStateDispatch({
      type: actionTypes.SUBMIT_FIGHT,
      payload: {
        fightId: userState.currentFightId,
        fightCode: code,
        fightScore: imageCompareScore
      }
    });
  }

  function imageCompareSlider(e) {
    if (userState.allowSlideAndCompare) {
      proxyOverlayRef.current.style.cursor = "col-resize";
      imgOverlayRef.current.style["z-index"] = "15";
      imgOverlayRef.current.style["border-right"] = "3px solid red";
      imgOverlayRef.current.style.width =
        e.clientX - outputWrapperRef.current.offsetLeft + "px";
    }
  }

  function resetWidth() {
    if (userState.allowSlideAndCompare) {
      proxyOverlayRef.current.style.cursor = "unset";
      imgOverlayRef.current.style["border-right"] = "none";
      imgOverlayRef.current.style["z-index"] = "9";
      imgOverlayRef.current.style.width = "400px";
    }
  }

  const currentFightData = fights.find(
    (fight) => fight.fightId === userState.currentFightId
  );
  const currentFightState = userState.fights.find(
    (fight) => fight.fightId === userState.currentFightId
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [code, setCode] = useState(currentFightState.fightCode);

  return (
    <div
      className="arena"
      onKeyDown={checkAndSaveCode}
      key={userState.currentFightId}
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
  );
}
