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
    const [parsedData, setParsedData] = React.useState('')
    
    React.useEffect(() => {
        window.addEventListener('message', event => {
          const message = event.data; // The json data that the extension sent
          switch (message.command) {
            case 'refactor':
                setButtonText('The brain is working');
                break;
            case 'parsed-data':
                setParsedData(message.value);
                console.log(message.value);
                break;
          }
        });
      }, 
    );

    const fileMessage = (e: any) => {
        const filePath = e.target.files[0].path;
        // Reset event target value to null so the same file selection causes onChange event to trigger
        e.target.value = null;
        if (filePath) {
          vscode.postMessage({
            command: "onFile",
            value: filePath
          });
        }
    };

    
    return (
        <div>
            <h1>Functional Components Work!</h1>
            <button onClick={sendMessage}>{buttonText}</button>
            <br></br>
            <input type="file" name="file" id="file" className="inputfile" onChange={(e) => {fileMessage(e);}}/>
            <p>{parsedData}</p>
        </div>
    );
}



ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);