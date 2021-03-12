import { Cell } from '../components';

const Field = ({ fieldModel, gameState, leftClickHandler, rightClickHandler }) => {
  return (
    <>
      {fieldModel.map((item) => {
        return (
          <div className="row" key={item.id}>
            {item.cells.map((elem) => {
              return (
                <Cell
                  gameState={gameState}
                  cell={elem}
                  key={elem.id}
                  leftClickHandler={leftClickHandler}
                  rightClickHandler={rightClickHandler}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Field;
