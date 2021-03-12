import { Cell } from '../components';

const Field = ({ fieldModel, gameState }) => {
  return (
    <>
      {fieldModel.map((item) => {
        return (
          <div className="row" key={item.id}>
            {item.cells.map((elem) => {
              return <Cell gameState={gameState} cell={elem} key={elem.id} />;
            })}
          </div>
        );
      })}
    </>
  );
};

export default Field;
