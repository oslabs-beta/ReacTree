import './styles.css';
import Navbar from './components/Navbar';
import MainBody from './components/MainBody';
import Team from './components/Team';
import Footer from './components/Footer';

const App = () => {
  return(
    <div id='App'>
      <Navbar />
      <MainBody />
      <Team />
      <Footer />
    </div>
  )
}

export default App;