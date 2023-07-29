import { useEffect, useState } from 'react';
import { getCards } from '@/api/userController';
import Spinner from '@/components/Utils/Spinner';
import Panel from '@/components/Core/Panel';
import Card from '@/components/Core/Card';
import Header from '@/components/Core/Header';
import Modal from '../../components/Utils/Modal';

export default function MemoryGame() {
  const USERNAME = localStorage.getItem('username');
  const [gameStatus, setGameStatus] = useState({
    hits: 0,
    misses: 0
  });
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

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

  const choiceCard = (card) => {
    if (selectedCards.length < 2) {
      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );
      setCards(updatedCards);
      setSelectedCards((prevArray) => [...prevArray, card.uuid]);
    }
  };

  useEffect(() => {
    if (selectedCards.length == 2) {
      setTimeout(() => {
        let match = selectedCards[0] === selectedCards[1];
        if (!match) {
          setCards((prevCards) =>
            prevCards.map((card) =>
              selectedCards.find((c) => card.uuid === c)
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }
        setGameStatus({
          ...gameStatus,
          hits: match ? gameStatus.hits + 1 : gameStatus.hits,
          misses: !match ? gameStatus.misses + 1 : gameStatus.misses
        });
        setSelectedCards([]);
      }, 1000);
    }
  }, [selectedCards, gameStatus, cards]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="">
          <Header />
          <Panel user={USERNAME} status={gameStatus} />
          <div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-8">
            {cards?.map((card) => (
              <Card card={card} selectCard={choiceCard} key={card.id} />
            ))}
          </div>
          <Modal/>
        </div>
      )}
    </>
  );
}
