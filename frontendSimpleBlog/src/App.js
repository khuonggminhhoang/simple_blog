import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import AppLayout from './components/AppLayout.js';

function App() {
  return (
    <Router>
      <AppLayout/>
    </Router>
  )
}

export default App;
