import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MemoryGame from '@/pages/MemoryGame';
import Home from '@/pages/Home';

function App() {
  const navigate = useNavigate();
  const USERNAME = localStorage.getItem('username');

  /*   Hook to redirect to the corresponding page in case the user is logged in or not.*/
  useEffect(() => {
    if (USERNAME === null) {
      navigate('/');
    } else {
      navigate('/memory-game');
    }
  }, [navigate, USERNAME]);

  return (
    <div className="flex items-center justify-center h-screen overflow-auto font-mono bg-stone-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory-game" element={<MemoryGame />} />
      </Routes>
    </div>
  );
}

export default App;
