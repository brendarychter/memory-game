import { Routes, Route } from 'react-router-dom';
import './App.css';
import MemoryGame from '@/pages/MemoryGame';
import Home from '@/pages/Home';

function App() {
  return (
    <div className="bg-stone-800 flex items-center justify-center h-screen font-mono">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/memory-game" element={<MemoryGame />}></Route>
        {/* No match route */}
      </Routes>
    </div>
  );
}

export default App;
