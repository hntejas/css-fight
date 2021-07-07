import { useUser } from "../../store/user";
import * as actionTypes from "../../store/user/userActionTypes";

export default function ArenaHeader() {
  const { user, userDispatch } = useUser();

  const updateSliderComparisonFlag = () => {
    userDispatch({
      type: actionTypes.UPDATE_SLIDE_COMPARE_FLAG,
      payload: { slideAndCompareFlag: !user.allowSlideAndCompare },
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
            checked={user.allowSlideAndCompare}
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
