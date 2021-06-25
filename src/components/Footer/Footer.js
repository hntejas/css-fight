import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <p>
        Created By
        <a
          href="https://www.linkedin.com/in/hntejas/"
          target="_blank"
          rel="noreferrer"
        >
          Tejas
        </a>
      </p>
      <p>
        Disclaimer: This site is built as a clone of
        <a href="https://cssbattle.dev/" target="_blank" rel="noreferrer">
          CSS Battle
        </a>{" "}
        only for educational purpose
      </p>
    </div>
  );
}
