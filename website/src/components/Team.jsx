import Justin from '../../public/Justin.jpg';
import Mike from '../../public/Mike.jpg';
import Brian from '../../public/Brian.jpg';
import Kevin from '../../public/Kevin.jpg';
import Fabian from '../../public/Fabian.jpg';


const Team = () => {
  return(
    <div className='team'>
      <h2>Meet Our Team</h2>
      <div className='team-members'>
        <div className='member'>
          <img className='member-photo'src={Justin}></img>
          <div className='member-name'>Justin Kim</div>
          <div className='member-title'>Software Engineer</div>
            <div className='member-links'>
              <a className='github-logo' href='https://github.com/justin27kim'>
                <img className ='github-logo'src='https://cdn-icons-png.flaticon.com/512/25/25231.png'/>
              </a>
              <a href='https://www.linkedin.com/in/justin27kim/'>
                <img className='linkedin-logo' src='https://cdn.onlinewebfonts.com/svg/img_24651.png'/>
              </a>
            </div>
        </div>
        <div className='member'>
          <img className='member-photo' src={Mike}></img>
          <div className='member-name'>Mike Benliyan</div>
          <div className='member-title'>Software Engineer</div>
          <div className='member-links'>
            <a className='github-logo' href='https://github.com/MichaelBenliyan'>
              <img className ='github-logo'src='https://cdn-icons-png.flaticon.com/512/25/25231.png'/>
            </a>
            <a href='https://www.linkedin.com/in/michaelbenliyan/'>
              <img className='linkedin-logo' src='https://cdn.onlinewebfonts.com/svg/img_24651.png'/>
            </a>
          </div>
        </div>
        <div className='member'>
          <img className='member-photo' src={Brian}></img>
          <div className='member-name'>Brian Noh</div>
          <div className='member-title'>Software Engineer</div>
          <div className='member-links'>
          <a className='github-logo' href='https://github.com/dogenoh'>
                <img className ='github-logo'src='https://cdn-icons-png.flaticon.com/512/25/25231.png'/>
              </a>
              <a href='https://www.linkedin.com/in/briannohski/'>
                <img className='linkedin-logo' src='https://cdn.onlinewebfonts.com/svg/img_24651.png'/>
              </a>
          </div>
        </div>
        <div className='member'>
          <img className='member-photo' src={Kevin}></img>
          <div className='member-name'>Kevin Liu</div>
          <div className='member-title'>Software Engineer</div>
          <div className='member-links'>
          <a className='github-logo' href='https://github.com/K8Liu'>
                <img className ='github-logo'src='https://cdn-icons-png.flaticon.com/512/25/25231.png'/>
              </a>
              <a href='https://www.linkedin.com/in/kevindliu/'>
                <img className='linkedin-logo' src='https://cdn.onlinewebfonts.com/svg/img_24651.png'/>
              </a>
          </div>
        </div>
        <div className='member'>
          <img className='member-photo' src={Fabian}></img>
          <div className='member-name'>Fabian Salazar</div>
          <div className='member-title'>Software Engineer</div>
          <div className='member-links'>
          <a className='github-logo' href='https://github.com/fsalazar88'>
                <img className ='github-logo'src='https://cdn-icons-png.flaticon.com/512/25/25231.png'/>
              </a>
              <a href='https://www.linkedin.com/in/fabian-salazar-260a7957/'>
                <img className='linkedin-logo' src='https://cdn.onlinewebfonts.com/svg/img_24651.png'/>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;