import ReacTree from '../../public/reactree-logo.png';
import GitHubLogo from '../../public/github-logo.png';
import VsCodeLogo from '../../public/vscode-logo.png';
import LaunchPropsOpenFiles from '../../public/launch-props-open-files.gif';
import NavbarControls from '../../public/navbar-controls.gif';
import Themes from '../../public/themes.gif'

const MainBody = () => {
  return(
    <div>
      <div className='logo-main'>
        <h1>ReacTree
          <img className='reactree-logo' src={ReacTree}></img>
        </h1>
        <h3>VsCode React nagivation extension</h3>
        <br></br> 
        <div className='get-reactree'>
          <a className='get-button' href='https://marketplace.visualstudio.com/'>ReacTree
            <img className='get-logo' src={GitHubLogo}></img>
          </a>
          <a className='get-button' href='https://github.com/oslabs-beta/ReacTree'>Get ReacTree 
            <img className='get-logo' src={VsCodeLogo}></img>
          </a>
        </div>
      </div>
      <div className='features-main'>
        <h2>Features</h2>
        <div className='feature'>
          <div className='feature-text'>
            <div className='feature-title'>
              <h3>feature title</h3>
            </div>
            <div className='feature-description'>feature description</div>
          </div>
          <img className='feature-image' src={LaunchPropsOpenFiles} alt="Launch reactree, show props, open files gif"/>
        </div>



        <img src={NavbarControls} alt="Nav-bar controls gif"/>
        <img src={Themes} alt="Themes gif"/>
      </div>
    </div>
    
  );
}

export default MainBody;