import './App.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import IntroLomda from './GenericComponent/IntroLomda';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<IntroLomda />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}


export default AppWrapper;
