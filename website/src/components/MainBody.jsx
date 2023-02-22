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
        <p className='sub-title'>Navigate and visualize your React application</p>
        <br></br> 
        <p className='reactree-intro'>
          Traverse your React project with a visual hierarchical tree
        </p>
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
            <div className='feature-description'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</div>
          </div>
          <img className='feature-image' src={LaunchPropsOpenFiles} alt="Launch reactree, show props, open files gif"/>
        </div>
        
        <div className='feature'>
          <div className='feature-text'>
            <div className='feature-title'>
              <h3>feature title</h3>
            </div>
            <div className='feature-description'>feature description</div>
          </div>
          <img className='feature-image' src={NavbarControls} alt="Nav-bar controls gif"/>
        </div>

        <div className='feature'>
          <div className='feature-text'>
            <div className='feature-title'>
              <h3>feature title</h3>
            </div>
            <div className='feature-description'>feature description</div>
          </div>
          <img className='feature-image' src={Themes} alt="Themes gif"/>
        </div>

      </div>
    </div>
    
  );
}

export default MainBody;