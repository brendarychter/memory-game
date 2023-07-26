import { Routes, Route } from 'react-router-dom';
import './App.css';
import MemoryGame from './pages/MemoryGame';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/memory-game" element={<MemoryGame />}></Route>
    </Routes>
  );
}

export default App;
