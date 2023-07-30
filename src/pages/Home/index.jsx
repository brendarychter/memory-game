import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Utils/Spinner';

// Home componente, where the user inputs the name
export default function Home() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  //After the component is loaded, the spinner is hidden
  useEffect(() => {
    setLoading(false);
  }, []);

  /* When the user clicks the Play button, it stores the name in localStorage and
    navigates to the game */
  const startGame = () => {
    setLoading(true);
    localStorage.setItem('username', username);
    navigate('/memory-game');
  };

  // It also works if the user press enter and the input has a value
  const handleKeyDown = (key) => {
    if (key === 'Enter' && username) startGame();
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-xl text-center lg:max-w-lg">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Memory game
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Challenge your memory!
          </p>
          <div className="flex max-w-md mt-6 gap-x-4">
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e.key)}
              required
              className="min-w-0 flex-auto rounded-full border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Enter your name"
            />
            <button
              type="submit"
              className="flex-none text-center rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm enabled:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-75"
              onClick={() => startGame()}
              disabled={username.trim() === ''}
            >
              Play
            </button>
          </div>
        </div>
      )}
    </>
  );
}
