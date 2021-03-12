const Cell = ({gameState, cell}) => {
  const classes = [];
  classes.push('cell');
  if (cell.isFlagged && !cell.isShowMine) classes.push('cell_flagged');
  if (cell.isShowMine) classes.push('cell_pressed cell_mined');
  if (cell.isPressed && cell.isMined) classes.push('cell_exploded');
  if (!gameState.isWin && !gameState.isLoose && !cell.isPressed) classes.push('cell_hover');
  classes.push(cell.isPressed ? 'cell_pressed' : 'cell_not-pressed');

  return(
    <div className={classes.join(' ')}>
      {cell.isPressed ? cell.value : null}
    </div>
  );
}

export default Cell;