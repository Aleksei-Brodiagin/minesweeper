const createFieldModel = (mines, rows, columns) => {
  const model = [];

  // creation rows
  for (let i = 0; i < rows; i++) {
    model.push({
      id: i,
      cells: [],
    });
  }

  // creation cells
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      model[i].cells.push({
        isFlagged: false,
        isPressed: false,
        isMined: false,
        id: `${i}-${j}`,
        value: null,
        nearbyCells: [],
      });
    }
  }

  // add nearby cells
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const arr = [];
      // Center
      if (i > 0 && i < rows - 1 && j > 0 && j < columns - 1) {
        arr.push(model[i - 1].cells[j]);
        arr.push(model[i - 1].cells[j + 1]);
        arr.push(model[i].cells[j + 1]);
        arr.push(model[i + 1].cells[j + 1]);
        arr.push(model[i + 1].cells[j]);
        arr.push(model[i + 1].cells[j - 1]);
        arr.push(model[i].cells[j - 1]);
        arr.push(model[i - 1].cells[j - 1]);
      }
      // Top
      if (i === 0 && j > 0 && j < columns - 1) {
        arr.push(model[i].cells[j + 1]);
        arr.push(model[i + 1].cells[j + 1]);
        arr.push(model[i + 1].cells[j]);
        arr.push(model[i + 1].cells[j - 1]);
        arr.push(model[i].cells[j - 1]);
      }
      // Bottom
      if (i === rows - 1 && j > 0 && j < columns - 1) {
        arr.push(model[i - 1].cells[j]);
        arr.push(model[i - 1].cells[j + 1]);
        arr.push(model[i].cells[j + 1]);
        arr.push(model[i].cells[j - 1]);
        arr.push(model[i - 1].cells[j - 1]);
      }
      // Left
      if (j === 0 && i > 0 && i < rows - 1) {
        arr.push(model[i - 1].cells[j]);
        arr.push(model[i - 1].cells[j + 1]);
        arr.push(model[i].cells[j + 1]);
        arr.push(model[i + 1].cells[j + 1]);
        arr.push(model[i + 1].cells[j]);
      }
      // Right
      if (j === columns - 1 && i > 0 && i < rows - 1) {
        arr.push(model[i - 1].cells[j]);
        arr.push(model[i + 1].cells[j]);
        arr.push(model[i + 1].cells[j - 1]);
        arr.push(model[i].cells[j - 1]);
        arr.push(model[i - 1].cells[j - 1]);
      }
      // Top-left
      if (i === 0 && j === 0) {
        arr.push(model[i].cells[j + 1]);
        arr.push(model[i + 1].cells[j + 1]);
        arr.push(model[i + 1].cells[j]);
      }
      // Top-right
      if (i === 0 && j === columns - 1) {
        arr.push(model[i + 1].cells[j]);
        arr.push(model[i + 1].cells[j - 1]);
        arr.push(model[i].cells[j - 1]);
      }
      // Bottom-left
      if (i === rows - 1 && j === 0) {
        arr.push(model[i - 1].cells[j]);
        arr.push(model[i - 1].cells[j + 1]);
        arr.push(model[i].cells[j + 1]);
      }
      // Bottom-right
      if (i === rows - 1 && j === columns - 1) {
        arr.push(model[i - 1].cells[j]);
        arr.push(model[i].cells[j - 1]);
        arr.push(model[i - 1].cells[j - 1]);
      }
      model[i].cells[j].nearbyCells = arr;
    }
  }

  // add mines
  const minesArr = [];
  while (minesArr.length < mines) {
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * columns);
    
    let found = false;
    for (let item of minesArr) {
      if(item.row === row && item.col === col) {
        found = true;
      } 
    }
    if(!found) minesArr.push({ row, col });
  }

  for (let i = 0; i < minesArr.length; i++) {
    model[minesArr[i].row].cells[minesArr[i].col].isMined = true;
    model[minesArr[i].row].cells[minesArr[i].col].showMine = false;
  }

  // add values
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let value = 0;

      model[i].cells[j].nearbyCells.forEach((item) => {
        if(item.isMined) value += 1;
      });
      
      if (value > 0 && !model[i].cells[j].isMined) model[i].cells[j].value = value;
    }
  }
  
  return model;
}

export default createFieldModel;
