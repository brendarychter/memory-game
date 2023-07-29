// eslint-disable-next-line react/prop-types
export default function Card({ card, selectCard, flipped }) {
  
    //Evitar que clickee sobre si mismo
    // When user clicks on a card, it executes the function sent by the parent
  const handleChange = () => {
    console.log(card)
    // selectCard({...card, isFlipped: !card.isFlipped})
    selectCard(card)
  };

  return (
    <div className=" bg-blue-500 p-4 ">
      <img
        style={{ cursor: 'pointer' }}
        className="img h-10 w-10"
        key={card.id}
        src={card.image}
        alt={card.name}
        onClick={handleChange}
        disabled={card.isFlipped === true}
      />
      {flipped && <div className="h-10 w-10 bg-red-500"></div>}
    </div>
  );
}
