import PropTypes from 'prop-types';

const Card = ({ card, selectCard }) => {
  const { image, id, name, isFlipped } = card;
  //Evitar que clickee sobre si mismo
  // When user clicks on a card, it executes the function sent by the parent
  const handleChange = () => selectCard(card);

  return (
    <div className={`relative ${isFlipped && `[transform:rotateY(180deg)]`} transition-all duration-500[transform-style:preserve-3d]`}>
      {isFlipped ? (
        <img
          className="object-cover w-20 h-20 border-2 border-solid rounded-md border-violet-500"
          key={id}
          src={image}
          alt={name}
          disabled={isFlipped}
        />
      ) : (
        <div
          className="w-20 h-20 border-2 border-white border-solid rounded-md cursor-pointer bg-gradient-to-r from-indigo-500 to-violet-500"
          onClick={handleChange}
        ></div>
      )}
    </div>
  );
}
Card.propTypes = {
    card: PropTypes.object.isRequired,
    selectCard: PropTypes.func.isRequired
}
export default Card;
