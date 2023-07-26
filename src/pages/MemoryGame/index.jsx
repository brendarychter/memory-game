import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCards } from '@/api/userController';
import Spinner from '@/components/Utils/Spinner';

export default function MemoryGame() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('username') == null) {
      setLoading(true);
      navigate(`/`);
    }
    //TODO: Handle
  }, [navigate]);

  const fetchData = async () => {
    try {
      const result = await getCards();
      setData(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {/* esto como logo arriba */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Memory game
          </h2>
          {/* Tablero? */}
          <h3>{username} a jugar!</h3>
          {data?.map(({ name }) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      )}
    </>
  );
}
