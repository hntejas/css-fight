import { useRef, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as htmlToImage from "html-to-image";

import { useUser } from "../../store/user";
import { FightsContext } from "../../store/fightsContext";
import { saveCode, saveAndSubmit } from "../../services/fight.service";

import ArenaHeader from "./ArenaHeader";
import TargetArea from "./TargetArea";
import CodeEditor from "./CodeEditor";
import ResultPreview from "./ResultPreview";
import { showToast } from "../../utils/helper";

export default function Arena() {
  const targetRef = useRef();
  const sourceRef = useRef();

  const { user, userDispatch, userActionTypes } = useUser();
  const { fights } = useContext(FightsContext);
  const { fightId } = useParams();

  const currentFightData = fights.find(
    (fight) => fight.fightId === user.currentFightId
  );
  const currentFightState = user.fights.find(
    (fight) => fight.fightId === user.currentFightId
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [code, setCode] = useState(
    currentFightState && currentFightState.fightCode
  );

  useEffect(() => {
    if (!currentFightState) {
      userDispatch({
        type: userActionTypes.UPDATE_CURRENT_FIGHT,
        payload: {
          fightId: parseInt(fightId),
        },
      });
      return;
    }
    user.currentFightId != fightId &&
      userDispatch({
        type: userActionTypes.UPDATE_CURRENT_FIGHT,
        payload: {
          fightId: parseInt(fightId),
        },
      });
  }, [fightId]);

  useEffect(() => {
    const currentFight = user.fights.find(
      (fight) => fight.fightId === user.currentFightId
    );
    currentFight && setCode(currentFight.fightCode);
  }, [user]);

  if (!currentFightState) {
    return "Loading...";
  }

  const checkAndSaveCode = async (e) => {
    if (
      (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
      e.keyCode === 83
    ) {
      showToast("Saving...");
      e.preventDefault();
      const response = await saveCode({
        fightId: currentFightState.fightId,
        fightCode: code,
      });
      if (response.success) {
        userDispatch({
          type: userActionTypes.UPDATE_FIGHT_CODE,
          payload: {
            fightId: currentFightState.fightId,
            fightCode: code,
          },
        });
        showToast("Saved!");
      } else {
        if (response.status == 401) {
          userDispatch({
            type: userActionTypes.UPDATE_USER_LOGIN,
            payload: {
              isLoggedIn: false,
            },
          });
          showToast("Please login to continue");
        }
      }
    }
  };

  const resetCode = () => {
    userDispatch({
      type: userActionTypes.RESET_FIGHT_CODE,
      payload: {
        fightId: user.currentFightId,
      },
    });
  };

  const submitToDispatch = (scores) => {
    userDispatch({
      type: userActionTypes.SUBMIT_FIGHT,
      payload: {
        fightId: user.currentFightId,
        fightCode: code,
        fightScores: scores,
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
      const response = await saveAndSubmit({
        targetImg: targetImageURI,
        sourceImg: sourceImageURI,
        fightId: user.currentFightId,
        fightCode: code,
      });
      if (response.success) {
        const scores = response.scores;
        submitToDispatch(scores);
      } else {
        if (response.status == 401) {
          userDispatch({
            type: userActionTypes.UPDATE_USER_LOGIN,
            payload: {
              isLoggedIn: false,
            },
          });
          showToast("Please login to continue");
        } else {
          showToast("Ops! something went wrong please try again");
        }
      }
      setIsProcessing(false);
    } catch (e) {
      console.log(e);
      setIsProcessing(false);
    }
  };

  return (
    <div className="arena-container">
      <ArenaHeader />
      <div
        className="arena"
        onKeyDown={checkAndSaveCode}
        key={user.currentFightId}
      >
        <CodeEditor
          code={code}
          setCode={setCode}
          resetCode={resetCode}
          disabled={!!isProcessing}
        />

        <ResultPreview
          currentFightData={currentFightData}
          currentFightState={currentFightState}
          code={code}
          ref={sourceRef}
          allowSlideAndCompare={user.allowSlideAndCompare}
          submitFight={submitFight}
          disabled={!!isProcessing}
        />

        <TargetArea currentFightData={currentFightData} ref={targetRef} />
      </div>
    </div>
  );
}
