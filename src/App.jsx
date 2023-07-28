import { Routes, Route } from 'react-router-dom';
import MemoryGame from '@/pages/MemoryGame';
import Home from '@/pages/Home';
import NoMatch from './components/Utils/NoMatch';

function App() {
  return (
    <div className="bg-stone-800 flex items-center justify-center h-screen font-mono">
      {/* Defining routes: landing and game */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/memory-game" element={<MemoryGame />}/>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
