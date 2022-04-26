import logo from './logo.svg';
import pengu from './pengu.jpg'
import './App.css';

function App() {
  return (
      <div className="App">
      <header className="App-header">
        <img src={pengu} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


