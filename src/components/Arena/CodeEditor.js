export default function CodeEditor({ code, setCode, resetCode, disabled }) {
  return (
    <div className="editor-container">
      <textarea
        disabled={disabled}
        id="editor"
        onChange={(e) => {
          setCode(e.target.value);
        }}
        value={code}
      ></textarea>
      <button className="btn-reset-code" onClick={resetCode} tabIndex="-1">
        Reset Code
      </button>
    </div>
  );
}
