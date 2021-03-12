import { showMine, isWin } from '../utils';

const openCells = (cell, model, setGameState) => {
  if (cell.isFlagged) return;

  if (cell.isPressed && cell.value) {
    let mines = 0;
    let flags = 0;

    cell.nearbyCells.forEach((item) => {
      if (item.isMined) mines++;
      if (item.isFlagged) flags++;
    });

    if (mines <= flags) {
      cell.nearbyCells.forEach((elem) => {
        if (!elem.isPressed) openCells(elem, model, setGameState);
      });
    }
  }

  cell.isPressed = true;

  if (cell.isMined) {
    setGameState((prev) => ({ ...prev, isLoose: true }));
    showMine(model);
    return;
  }

  if (cell.value === null) {
    cell.nearbyCells.forEach((item) => {
      if (!item.isPressed) openCells(item, model, setGameState);
    });
  }

  if (isWin(model)) {
    setGameState((prev) => ({ ...prev, isWin: true }));
  }
};

export default openCells;
