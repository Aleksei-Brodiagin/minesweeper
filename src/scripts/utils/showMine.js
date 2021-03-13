const showMine = (model) => {
  model.map((item) => {
    item.cells.map((cell) => {
      if (cell.isMined && !cell.isPressed) cell.isShowMine = true;
      return cell;
    });
    return item;
  });
};

export default showMine;
