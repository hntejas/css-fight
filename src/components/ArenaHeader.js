import { useContext } from "react";
import { UserContext } from "../store/userContext";
import * as actionTypes from "../store/userActionTypes";

export default function ArenaHeader() {
  const { userState, userStateDispatch } = useContext(UserContext);

  const updateSliderComparisonFlag = () => {
    userStateDispatch({
      type: actionTypes.UPDATE_SLIDE_COMPARE_FLAG,
      payload: { slideAndCompareFlag: !userState.allowSlideAndCompare }
    });
  };

  return (
    <div className="arena-header">
      <div className="editor-header">
        {" "}
        <b> EDITOR [ Press ctrl+s to save ]</b>
      </div>
      <div className="source-header">
        {" "}
        <b>OUTPUT</b>
        <div className="slider-container">
          <input
            id="slider-flag"
            type="checkbox"
            checked={userState.allowSlideAndCompare}
            onChange={() => updateSliderComparisonFlag()}
            style={{ cursor: "pointer" }}
          ></input>
          <label htmlFor="slider-flag" style={{ cursor: "pointer" }}>
            Slide & Compare
          </label>
        </div>
      </div>
      <div className="target-header">
        <b> TARGET </b>
        <span>400px x 300px</span>
      </div>
    </div>
  );
}
