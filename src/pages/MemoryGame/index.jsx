import { useEffect, useState } from 'react';
import { getCards } from '@/api/userController';
import Spinner from '@/components/Utils/Spinner';
import Panel from '@/components/Core/Panel';
import Card from '@/components/Core/Card';
import Modal from '../../components/Utils/Modal';

export default function MemoryGame() {
  const STATUS = {
    hits: 0,
    misses: 0
  };
  const [gameStatus, setGameStatus] = useState(STATUS);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const shuffleCards = (cards) => cards.sort(() => Math.random() - 0.5);

  /* Fetching data from service
   * When receivein the data, the cards are shuffled with the method above
   */
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
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  /* SelectedCards is the array that contains both the uuids from the selected cards. 
   * When the user picks a card, the property isFlipped is changed to true, so it means that card
   * is selected. If not, it remains the same. Then the cards array is updated
   */
  const choiceCard = (card) => {
    if (selectedCards.length < 2) {
      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );
      setCards(updatedCards);
      setSelectedCards((prevArray) => [...prevArray, card.uuid]);
    }
  };

  /* If the user picked the two cards, meaning the selectedCards.length is equal to 2, 
   * it compares the cards to see if they match. That way, both cards stay flipped. If not
   * the cards are updated again finding the ones that where flipped.
   * It also updates the panel with the status game with the hits and the misses count
   * Then if all the cards have the property isFlipped in true, the game finishes and the modal is shown 
   * it gives the user the option to reset the game and play again or exit the game
   */
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

  /* When the game ends, and the user wants to play again, the modal is hidden, the cards are
   * are flipped and shuffled and the panel with the game status resets to 0
   */
  const resetGame = () => {
    setShowModal(false);
    setGameStatus(STATUS);
    setCards(shuffleCards(cards.map((obj) => ({ ...obj, isFlipped: false }))));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-screen">
          <Panel status={gameStatus} />
          <div className="grid grid-cols-5 gap-2 md:gap-4 lg:grid-cols-8 p-y-10">
            {cards?.map((card) => (
              <Card card={card} selectCard={choiceCard} key={card.id} />
            ))}
          </div>
          {showModal && <Modal gameStatus={gameStatus} resetGame={resetGame} />}
        </div>
      )}
    </>
  );
}
