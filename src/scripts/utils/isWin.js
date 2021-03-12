const isWin = (model) => {
  let closedCells = 0;
  let mines = 0;
  for (let i = 0; i < model.length; i++) {
    for (let j = 0; j < model[i].cells.length; j++) {
      if (model[i].cells[j].isMined) {
        mines++;
      }
      if (!model[i].cells[j].isPressed) {
        closedCells++;
      }
    }
  }

  return mines === closedCells ? true : false;
};

export default isWin;
