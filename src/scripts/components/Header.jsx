import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img className="logo__img" src={logo} alt="Logo" />
        <h1 className="logo__text">Minesweeper</h1>
      </div>
    </header>
  );
};

export default Header;
