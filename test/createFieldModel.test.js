import { createFieldModel } from '../src/scripts/utils';

describe('createFieldModel:', () => {
  test('number of rows correctly', () => {
    expect(createFieldModel(10, 9, 9).length).toBe(9);
    expect(createFieldModel(40, 16, 16).length).toBe(16);
    expect(createFieldModel(99, 16, 30).length).toBe(16);
  });

  test('number of cells correctly', () => {
    expect(createFieldModel(10, 9, 9)[5].cells.length).toBe(9);
    expect(createFieldModel(40, 16, 16)[7].cells.length).toBe(16);
    expect(createFieldModel(99, 16, 30)[11].cells.length).toBe(30);
  });

  test('number of mines correctly', () => {
    let i = 0;
    while (i < 10) {
      const randNum = Math.floor(Math.random() * 100);
      let mines = 0;
      const model = createFieldModel(randNum, 16, 30);

      model.forEach((item) => {
        item.cells.forEach((elem) => {
          if (elem.isMined) mines++;
        });
      });

      expect(mines).toBe(randNum);
      i++;
    }
  });

  test('nearby cells for center cell set correctly', () => {
    const model = createFieldModel(99, 16, 30);
    expect(model[8].cells[15].nearbyCells.includes(model[7].cells[15])).toBeTruthy();
    expect(model[8].cells[15].nearbyCells.includes(model[7].cells[16])).toBeTruthy();
    expect(model[8].cells[15].nearbyCells.includes(model[8].cells[16])).toBeTruthy();
    expect(model[8].cells[15].nearbyCells.includes(model[9].cells[16])).toBeTruthy();
    expect(model[8].cells[15].nearbyCells.includes(model[9].cells[15])).toBeTruthy();
    expect(model[8].cells[15].nearbyCells.includes(model[9].cells[14])).toBeTruthy();
    expect(model[8].cells[15].nearbyCells.includes(model[8].cells[14])).toBeTruthy();
    expect(model[8].cells[15].nearbyCells.includes(model[7].cells[14])).toBeTruthy();
  });

  test('nearby cells for top cell set correctly', () => {
    const model = createFieldModel(99, 16, 30);
    expect(model[0].cells[13].nearbyCells.includes(model[0].cells[14])).toBeTruthy();
    expect(model[0].cells[13].nearbyCells.includes(model[1].cells[14])).toBeTruthy();
    expect(model[0].cells[13].nearbyCells.includes(model[1].cells[13])).toBeTruthy();
    expect(model[0].cells[13].nearbyCells.includes(model[1].cells[12])).toBeTruthy();
    expect(model[0].cells[13].nearbyCells.includes(model[0].cells[12])).toBeTruthy();
  });

  test('nearby cells for bottom cell set correctly', () => {
    const model = createFieldModel(99, 16, 30);
    expect(model[15].cells[20].nearbyCells.includes(model[14].cells[20])).toBeTruthy();
    expect(model[15].cells[20].nearbyCells.includes(model[14].cells[21])).toBeTruthy();
    expect(model[15].cells[20].nearbyCells.includes(model[15].cells[21])).toBeTruthy();
    expect(model[15].cells[20].nearbyCells.includes(model[15].cells[19])).toBeTruthy();
    expect(model[15].cells[20].nearbyCells.includes(model[14].cells[19])).toBeTruthy();
  });

  test('nearby cells for left cell set correctly', () => {
    const model = createFieldModel(99, 16, 30);
    expect(model[8].cells[0].nearbyCells.includes(model[7].cells[0])).toBeTruthy();
    expect(model[8].cells[0].nearbyCells.includes(model[7].cells[1])).toBeTruthy();
    expect(model[8].cells[0].nearbyCells.includes(model[8].cells[1])).toBeTruthy();
    expect(model[8].cells[0].nearbyCells.includes(model[9].cells[1])).toBeTruthy();
    expect(model[8].cells[0].nearbyCells.includes(model[9].cells[0])).toBeTruthy();
  });

  test('nearby cells for right cell set correctly', () => {
    const model = createFieldModel(99, 16, 30);
    expect(model[6].cells[29].nearbyCells.includes(model[5].cells[29])).toBeTruthy();
    expect(model[6].cells[29].nearbyCells.includes(model[7].cells[29])).toBeTruthy();
    expect(model[6].cells[29].nearbyCells.includes(model[7].cells[28])).toBeTruthy();
    expect(model[6].cells[29].nearbyCells.includes(model[6].cells[28])).toBeTruthy();
    expect(model[6].cells[29].nearbyCells.includes(model[5].cells[28])).toBeTruthy();
  });

  test('nearby cells for top-left cell set correctly', () => {
    const model = createFieldModel(99, 16, 30);
    expect(model[0].cells[0].nearbyCells.includes(model[0].cells[1])).toBeTruthy();
    expect(model[0].cells[0].nearbyCells.includes(model[1].cells[0])).toBeTruthy();
    expect(model[0].cells[0].nearbyCells.includes(model[1].cells[1])).toBeTruthy();
  });

  test('nearby cells for top-right cell set correctly', () => {
    const model = createFieldModel(99, 16, 30);
    expect(model[0].cells[29].nearbyCells.includes(model[1].cells[29])).toBeTruthy();
    expect(model[0].cells[29].nearbyCells.includes(model[1].cells[28])).toBeTruthy();
    expect(model[0].cells[29].nearbyCells.includes(model[0].cells[28])).toBeTruthy();
  });

  test('nearby cells for bottom-left cell set correctly', () => {
    const model = createFieldModel(99, 16, 30);
    expect(model[15].cells[0].nearbyCells.includes(model[14].cells[0])).toBeTruthy();
    expect(model[15].cells[0].nearbyCells.includes(model[14].cells[1])).toBeTruthy();
    expect(model[15].cells[0].nearbyCells.includes(model[15].cells[1])).toBeTruthy();
  });

  test('nearby cells for bottom-right cell set correctly', () => {
    const model = createFieldModel(99, 16, 30);
    expect(model[15].cells[29].nearbyCells.includes(model[14].cells[29])).toBeTruthy();
    expect(model[15].cells[29].nearbyCells.includes(model[15].cells[28])).toBeTruthy();
    expect(model[15].cells[29].nearbyCells.includes(model[14].cells[28])).toBeTruthy();
  });

  test('cells values set correctly', () => {
    let i = 0;
    while (i < 100) {
      const model = createFieldModel(99, 16, 30);
      let val = null;
      const randRow = Math.floor(Math.random() * 16);
      const randCol = Math.floor(Math.random() * 30);

      let mines = 0;
      model[randRow].cells[randCol].nearbyCells.forEach((item) => {
        if (item.isMined) mines++;
      });

      if (mines && !model[randRow].cells[randCol].isMined) val = mines;
      expect(model[randRow].cells[randCol].value === val).toBeTruthy();
      i++;
    }
  });
});
