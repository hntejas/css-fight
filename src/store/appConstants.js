export const DEFAULT_CODE = `<div></div>
<style>
body {
/* do not change these properties */
  width: 400px;
  height: 300px;
  overflow: hidden;
  margin: 0;
}
div {
  width: 100px;
  height: 100px;
  background: #dd6b4d;
}

/*
-> Select your favorite fight on the top navigation
-> Use this editor window make your changes to HTML/CSS to replicate the target image
-> Hover on the Output window to slide and compare your version to the target

Note: The comparison engine on Submit is not 100% accurate and might lead to lower score. 
Apologies on this experience - Will be fixed in future releases
*/

</style>
`;

export const FIGHT_STATUSES = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  NOT_STARTED: "NOT_STARTED",
};

export const DEFAULT_FIGHT_STATE = {
  fightHighScore: 0,
  fightLastScore: 0,
  fightCode: DEFAULT_CODE,
};
