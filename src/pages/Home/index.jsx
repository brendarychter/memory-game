import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/Utils/Spinner';

export default function Home() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    if (localStorage.getItem('username')) {
      navigate('/memory-game');
    }
  });

  const redirectToGame = () => {
    setLoading(true);
    localStorage.setItem('username', username);
    navigate('/memory-game');
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-xl lg:max-w-lg">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Memory game
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Desafía tu memoria
          </p>
          <div className="mt-6 flex max-w-md gap-x-4">
            <label htmlFor="username" className="sr-only">
              Ingrese su nombre
            </label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Ingrese su nombre"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm enabled:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-75"
              onClick={() => redirectToGame()}
              disabled={username === ''}
            >
              Jugar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
