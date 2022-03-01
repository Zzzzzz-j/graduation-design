import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Router from './router';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      Hello World!
      <Router />
    </div>
  );
}

export default App;
