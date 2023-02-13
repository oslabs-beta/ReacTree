import Justin from '../../public/Justin.jpg';
import Mike from '../../public/Mike.jpg';
import Brian from '../../public/Brian.jpg';
import Kevin from '../../public/Kevin.jpg';
import Fabian from '../../public/Fabian.jpg';

const Team = () => {
  return(
    <div className='team'>
      <h2>Our Team Members</h2>
      <div className='team-members'>
        <div className='member'>
          <img src={Justin}></img>
          Justin Kim
        </div>
        <div className='member'>
          <img src={Mike}></img>
          Mike Benliyan
        </div>
        <div className='member'>
          <img src={Brian}></img>
          Brian Noh
        </div>
        <div className='member'>
          <img src={Kevin}></img>
          Kevin Liu
        </div>
        <div className='member'>
          <img src={Fabian}></img>
          Fabian Salazar
        </div>
      </div>
    </div>
  );
}

export default Team;