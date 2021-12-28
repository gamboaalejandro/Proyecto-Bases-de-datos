import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label>Hola</label>
        <input>Hola</input>
        <button>Presionar</button>
        <p>
          Bienvenido a la perdicion del semestre, pelaras bola parejo mi pana!
        </p>
        <a
          className="App-link"
          href="https://c.tenor.com/3DRRn-B8_dcAAAAS/feliz-contento.gif"
          target="_blank"
          rel="noopener noreferrer"
        >
          Da clic para alegrarte
        </a>
      </header>
    </div>
  );
}

export default App;
