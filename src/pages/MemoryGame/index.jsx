import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCards } from '@/api/userController';
import Spinner from '@/components/Utils/Spinner';
import Panel from '@/components/Core/Panel';
import { UserContext } from '../../context';
import Card
 from '../../components/Core/Card';
export default function MemoryGame() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const {user, cards, setCards, loading, setLoading} = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCards();
        setCards(result);
        setLoading(false);
        // TODO: error
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [setCards, setLoading]);


  // Hook to verify if user exists in localstorage, otherwise it redirects to login page
  useEffect(() => {
    if (localStorage.getItem('username') == null) {
      setLoading(true);
      navigate(`/`);
    }
  }, [navigate, setLoading]);

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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-4">
            {cards?.map((card) => (
              <Card {...card} key={card.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
