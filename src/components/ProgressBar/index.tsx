import "./ProgressBar.css";

const ProgressBar = ({ completed }: { completed: number }) => (
  <div className="progress-bar">
    <div
      className="progress-bar__fill"
      style={{ width: `${completed}%` }}
    ></div>
  </div>
);

export default ProgressBar;
