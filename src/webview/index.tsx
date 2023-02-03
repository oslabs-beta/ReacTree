const React = require('react');
const ReactDOM = require('react-dom');

interface vscode {
    postMessage(message: any): void;
}
// declare function acquireVsCodeApi(): vscode;
declare const vscode: vscode;

const sendMessage = () => {
    console.log('button clicked')
    vscode.postMessage({ command: 'testing' });
}

function App() {
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
            <button onClick={sendMessage}>{buttonText}</button>
        </div>
    );
}



ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);