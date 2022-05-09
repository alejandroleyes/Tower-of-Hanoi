const WinMessageComp = ({ moveCount }) => {
  return (
    <div className="win-message">
      Well Done!
      <div className="win-subtitle">
        You completed the game in{" "}
        <span className="win-number">{moveCount}</span> moves!
      </div>
    </div>
  )
}

export default WinMessageComp
