import { useEffect, useState } from 'react';
import { getCards } from '@/api/userController';
import Spinner from '@/components/Utils/Spinner';
import Panel from '@/components/Core/Panel';
import Card from '@/components/Core/Card';

export default function MemoryGame() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    name: localStorage.getItem('username'),
    hits: 0,
    misses: 1
  });

  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
     const fetchData = async() => {
      try {
        const result = await getCards();
        setData(result);
        setLoading(false);
        // TODO: handle error
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);


  // Card selection and compare between each other.
  // It is sent by the parent to the card child and executed when it's clicked
  const selectCard = (card) => {
    if (selectedCards.length === 0) {
      setSelectedCards((prevArray) => [...prevArray, card.uuid]);
    }
  };

  useEffect(() => {
    console.log(selectedCards);
  }, [selectedCards]);

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
            {data?.map((card) => (
              <Card card={card} selectCard={selectCard} key={card.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
