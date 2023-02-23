const Navbar = () => {
  return(
    <nav>
      <div className='left-buttons'>
        <a className='nav-padding nav-button' href='https://medium.com/'>About</a>
        <a className='nav-button' href='https://github.com/oslabs-beta/ReacTree'>Github</a>
      </div>
      <div className='right-button'>
        <a className='nav-button get-reactree-button' href='https://marketplace.visualstudio.com/'>Get ReacTree</a>
      </div>
    </nav>
  );
}

export default Navbar;