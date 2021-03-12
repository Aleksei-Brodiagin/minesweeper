import { useState } from 'react';
import {ControlPanel, Field} from '../components';
import {createFieldModel} from '../utils';

const Game = () => {
  const storageSettings = JSON.parse(localStorage.getItem('minesweeperSettings'));
  const fieldVariants = [[10, 9, 9], [40, 16, 16], [99, 16, 30]];
  const [settings, setSettings] = useState(storageSettings || 0);
  const [fieldModel, setFieldModel] = useState(() => createFieldModel(...fieldVariants[settings]));
  const [gameState, setGameState] = useState({isWin: false, isLoose: false, mines: fieldVariants[settings][0]});

  return(
    <main className='main'>
      <div className='game-container'>
        <ControlPanel gameState={gameState}/>
        <Field fieldModel={fieldModel} gameState={gameState} />
      </div>
    </main>
  );
}

export default Game;
