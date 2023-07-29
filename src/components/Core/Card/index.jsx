// eslint-disable-next-line react/prop-types
export default function Card({ card, selectCard }) {
  const { image, id, name, isFlipped } = card;
  //Evitar que clickee sobre si mismo
  // When user clicks on a card, it executes the function sent by the parent
  const handleChange = () => selectCard(card);

  return (
    <div className="p-2">
      <div className="">
        {isFlipped ? (
          <img
            className="h-16 w-16 sm:w-20 sm:h-20 object-cover rounded-md border-solid border-2 border-violet-500"
            key={id}
            src={image}
            alt={name}
            disabled={isFlipped === true}
          />
        ) : (
          <div
            className="h-16 w-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-500 to-violet-500 cursor-pointer rounded-md border-solid border-2 border-white"
            onClick={handleChange}
          ></div>
        )}
      </div>
    </div>
  );
}
