const ControlPanel = ({ gameState, btnSettingsHandler, btnNewGameHandler }) => {
  const classes = [];
  classes.push('btn');
  if (gameState.isWin) classes.push('new-game-btn_win');
  if (gameState.isLoose) classes.push('new-game-btn_loose');
  if (!gameState.isWin && !gameState.isLoose) classes.push('new-game-btn_play');

  return (
    <div className="control-panel">
      <button className={classes.join(' ')} onClick={() => btnNewGameHandler()} />
      <div className="mines-counter">
        <span className="mines-counter__text">{gameState.mines}</span>
      </div>
      <button className="btn settings-btn" onClick={() => btnSettingsHandler()} />
    </div>
  );
};

export default ControlPanel;
