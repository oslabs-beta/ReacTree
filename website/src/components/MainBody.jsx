import Carousel from "./Carousel";

const MainBody = () => {
  return(
    <div>
      <div className='logo-main'>
        <h1>ReacTree</h1>
        <h3>Something something help you traverse your React project</h3>
        Logo banner
        <br></br>
        <br></br>
        <a href='https://marketplace.visualstudio.com/'>Get ReacTree [VS Code Icon]</a>
        <a href='https://github.com/oslabs-beta/ReacTree'>ReacTree [Github Logo]</a>
      </div>
      <div className='features-main'>
        <h2>Features</h2>
        <Carousel/>
      </div>
    </div>
    
  );
}

export default MainBody;