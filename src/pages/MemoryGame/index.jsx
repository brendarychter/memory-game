import { useEffect, useState } from 'react';
import { getCards } from '@/api/userController';
import Spinner from '@/components/Utils/Spinner';
import Panel from '@/components/Core/Panel';
import Card from '@/components/Core/Card';
import Modal from '../../components/Utils/Modal';

export default function MemoryGame() {
  const [gameStatus, setGameStatus] = useState({
    hits: 0,
    misses: 0
  });
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  // const [error, setError] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const shuffleCards = (cards) => cards.sort(() => Math.random() - 0.5);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const result = await getCards();
        if (!ignore) {
          setCards(shuffleCards(result));
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
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
        
        if (cards.every((card) => card.isFlipped === true)) {
          setShowModal(true);
        }
      }, 1000);
    }
  }, [selectedCards, gameStatus, cards]);

  const resetGame = () => {
    setShowModal(false);
    const newcards = cards.map((obj) => ({ ...obj, isFlipped: false }))
    console.log(newcards);
    setCards(shuffleCards(newcards));
    // contador en 0
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="">
          <Panel status={gameStatus} />
          <div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-8">
            {cards?.map((card) => (
              <Card card={card} selectCard={choiceCard} key={card.id} />
            ))}
          </div>
          {/* {showModal && ( */}
            <Modal
              gameStatus={gameStatus}
              resetGame={resetGame}
            />
          {/* )} */}
        </div>
      )}
    </>
  );
}
