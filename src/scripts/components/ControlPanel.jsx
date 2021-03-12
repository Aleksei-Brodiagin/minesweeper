const ControlPanel = () => {
  return(
    <div className='control-panel'>
      <button className='btn' />
      <div className='mines-counter'>
        <span className='mines-counter__text'>
          {}
        </span>
      </div>
      <button className='btn settings-btn' />
    </div>
  );
}

export default ControlPanel;