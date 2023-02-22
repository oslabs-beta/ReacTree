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
        <p className='sub-title'>Visualize and navigate your React application</p>
        <br></br> 
        <p className='reactree-intro'>
          As your projects become more intricate, 
          view and manage your parent-child components in a hierarchy tree
        </p>
        <br></br> 
        <div className='get-reactree'>
          <a className='get-button' href='https://github.com/oslabs-beta/ReacTree/'>ReacTree
            <img className='get-logo' src={GitHubLogo}></img>
          </a>
          <a className='get-button' href='https://marketplace.visualstudio.com'>Get ReacTree 
            <img className='get-logo' src={VsCodeLogo}></img>
          </a>
        </div>
      </div>
      
      <div className='features-main'>
        <h2>Features Demo</h2>
        <div className='feature'>
          <div className='feature-text'>
            <div className='feature-title'>
              <h3>Launch ReacTree</h3>
            </div>
            <div className='feature-description'>
              <ul>
                <li>Access ReacTree from your status bar</li>
                <li>Select your project's root file </li>
                <li>Toggle the tree nodes to view the component's props</li>
                <li>Toggle props in the control bar to view all components' props at once</li>
                <li>Easily access the component files and open them for editing</li>
              </ul>
            </div>
          </div>
          <img className='feature-image' src={LaunchPropsOpenFiles} alt="Launch reactree, show props, open files gif"/>
        </div>
        
        <div className='feature'>
          <div className='feature-text'>
            <div className='feature-title'>
              <h3>Node Features</h3>
            </div>
            <div className='feature-description'>
            <ul>
                <li>Customize the tree by dragging and dropping components to your preferred layout</li>
                <li>Lock your tree in place and view either vertically or horizontally for easier navigation</li>
                <li>Easily monitor component usage with the usage count conveniently displayed on the top right of each node.</li>
              </ul>
            </div>
          </div>
          <img className='feature-image' src={NavbarControls} alt="Nav-bar controls gif"/>
        </div>
        <div className='feature'>
          <div className='feature-text'>
            <div className='feature-title'>
              <h3>Themes</h3>
            </div>
            <div className='feature-description'>
              <ul>
                <li>⇧⌘P(Mac) Ctrl+Shift+P (Windows), type "Preferences:Color Theme"</li>
                <li>Choose a customized theme that best suit your preference</li>
              </ul>
            </div>
          </div>
          <img className='feature-image' src={Themes} alt="Themes gif"/>
        </div>

      </div>
    </div>
    
  );
}

export default MainBody;