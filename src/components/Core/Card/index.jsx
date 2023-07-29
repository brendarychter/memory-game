// eslint-disable-next-line react/prop-types
export default function Card({ card, selectCard, flipped }) {

    // When user clicks on a card, it executes the function sent by the parent
  const handleChange = () => selectCard(card);
    
  return (
    <div className=" bg-blue-500 p-4 ">
      <img
        className="img h-10 w-10"
        key={card.id}
        src={card.image}
        alt={card.name}
        onClick={handleChange}
      />
      <div className="h-10 w-10 bg-red-500"></div>
    </div>
  );
}
