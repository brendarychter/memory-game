import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCards } from '@/api/userController';
import Spinner from '@/components/Utils/Spinner';
import Panel from '@/components/Core/Panel';

export default function MemoryGame() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    name: localStorage.getItem('username'),
    hits: 0,
    misses: 1
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCards();
        console.log(result);
        setData(result);
        setLoading(false);
        // TODO: error
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('username') == null) {
      setLoading(true);
      navigate(`/`);
    }
    //TODO: Handle
  }, [navigate]);

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
          <Panel {...user} />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
            {data?.map(({ id, image }) => (
              <div key={id} className=" bg-blue-500 p-4 ">
                <img className="img h-20 w-20" src={image}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
