import * as React from 'react';
import './App.css';

import logo from './logo.svg';


const App = (props: {onClick: () => () => void}) => {

  const [buttonText, setButtonText] = React.useState('The brain is pending');

  React.useEffect(() => {
    window.addEventListener('message', event => {
      const message = event.data; // The json data that the extension sent
      switch (message.command) {
          case 'refactor':
              setButtonText('The brain is working');
              break;
      }
  });
  }, );


  return (
    <div>
      <h1>Functional Components Work!</h1>
      <button onClick={props.onClick()}>{buttonText}</button>
    </div>
  );
};

export default App;
