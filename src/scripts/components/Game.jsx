import { useEffect, useState } from 'react';
import { ControlPanel, Field } from '../components';
import { createFieldModel, openCells } from '../utils';

const Game = () => {
  const storageSettings = JSON.parse(localStorage.getItem('minesweeperSettings'));
  const fieldVariants = [
    [10, 9, 9],
    [40, 16, 16],
    [99, 16, 30],
  ];
  const [settings, setSettings] = useState(storageSettings || 0);
  const [fieldModel, setFieldModel] = useState(() => createFieldModel(...fieldVariants[settings]));
  const [gameState, setGameState] = useState({
    isWin: false,
    isLoose: false,
    mines: fieldVariants[settings][0],
  });

  const leftClickHandler = (id) => {
    setFieldModel((prev) =>
      prev.map((item) => {
        item.cells.map((elem) => {
          if (elem.id === id) openCells(elem, prev, setGameState);
          return elem;
        });
        return item;
      })
    );
  };

  const rightClickHandler = (id) => {
    setFieldModel(
      fieldModel.map((item) => {
        item.cells.map((elem) => {
          if (elem.id === id && !elem.isPressed) {
            if (!elem.isFlagged) {
              elem.isFlagged = true;
              setGameState((prev) => ({ ...prev, mines: prev.mines - 1 }));
            } else {
              elem.isFlagged = false;
              setGameState((prev) => ({ ...prev, mines: prev.mines + 1 }));
            }
          }
          return elem;
        });
        return item;
      })
    );
  };

  const btnSettingsHandler = () => {
    setSettings((prev) => (prev + 1) % 3);
  };

  useEffect(() => {
    localStorage.setItem('minesweeperSettings', JSON.stringify(settings));
    setFieldModel(createFieldModel(...fieldVariants[settings]));
    setGameState({ isWin: false, isLoose: false, mines: fieldVariants[settings][0] });
  }, [settings]);

  const btnNewGameHandler = () => {
    setFieldModel(createFieldModel(...fieldVariants[settings]));
    setGameState({ isWin: false, isLoose: false, mines: fieldVariants[settings][0] });
  };

  return (
    <main className="main">
      <div className="game-container">
        <ControlPanel
          gameState={gameState}
          btnSettingsHandler={btnSettingsHandler}
          btnNewGameHandler={btnNewGameHandler}
        />
        <Field
          fieldModel={fieldModel}
          gameState={gameState}
          leftClickHandler={leftClickHandler}
          rightClickHandler={rightClickHandler}
        />
      </div>
    </main>
  );
};

export default Game;
