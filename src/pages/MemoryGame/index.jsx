import { useEffect, useState } from 'react';
import { getCards } from '@/api/userController';
import Spinner from '@/components/Utils/Spinner';
import Panel from '@/components/Core/Panel';
import Card from '@/components/Core/Card';
import Header from '@/components/Core/Header';

export default function MemoryGame() {
  const [user, setUser] = useState({
    name: localStorage.getItem('username'),
    hits: 0,
    misses: 0
  });

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const result = await getCards();
        if (!ignore) {
          setCards(result);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  // Card selection and compare between each other.
  const selectCard = (card) => {
    console.log(card)
    if (selectedCards.length < 2)
      setSelectedCards((prevArray) => [...prevArray, card.uuid]);
  };

  useEffect(() => {
    console.log(selectedCards)
    if (selectedCards.length == 2) {
      if (selectedCards[0] === selectedCards[1]) {
        setUser({...user, hits: user.hits + 1});
      } else {
        setUser({...user, misses: user.misses + 1});
      }
      setTimeout(setSelectedCards([], 1000));
    }
  }, [selectedCards]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Header />
          <Panel {...user} />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
            {cards?.map((card) => (
              <Card card={card} selectCard={selectCard} key={card.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
